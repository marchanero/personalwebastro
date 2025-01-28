import axios from 'axios';
import ScholarPublication from '../../models/ScholarPublication.js';

class ScholarService {
  constructor() {
    this.API_KEY = process.env.SERPAPI_KEY || '52af1c0772ad45b320a85418a359631bfe0da0128ef18d67324a2276093c12e2';
    this.AUTHOR_ID = process.env.GOOGLE_SCHOLAR_AUTHOR_ID || 'PCALePwAAAAJ';
    this.BASE_URL = 'https://serpapi.com/search.json';

    if (!this.API_KEY || !this.AUTHOR_ID) {
      console.error('Missing required environment variables for Google Scholar service');
    }
  }

  async shouldUpdate() {
    const lastPublication = ScholarPublication.findOne({
      order: [['lastUpdated', 'DESC']],
      attributes: ['lastUpdated']
    });

    if (!lastPublication) return true;

    const now = new Date();
    const lastUpdate = new Date(lastPublication.lastUpdated);
    const hoursSinceLastUpdate = (now - lastUpdate) / (1000 * 60 * 60);

    // Actualizar si han pasado más de 24 horas
    return hoursSinceLastUpdate >= 24;
  }

  async fetchScholarData() {
    try {
      let allArticles = [];
      let nextUrl = null;
      let firstResponse = null;

      do {
        console.log('Fetching publications...');
        
        const params = nextUrl ? {
          api_key: this.API_KEY,
          ...Object.fromEntries(new URL(nextUrl).searchParams)
        } : {
          api_key: this.API_KEY,
          engine: 'google_scholar_author',
          author_id: this.AUTHOR_ID,
          hl: 'en',
          view_op: 'list_works'
        };

        const response = await axios.get(this.BASE_URL, {
          params,
          timeout: 10000,
          headers: { 'Accept': 'application/json' }
        });

        if (!firstResponse) {
          firstResponse = response;
        }

        console.log('Response status:', response.status);
        console.log('Total articles in response:', response.data.articles?.length || 0);

        if (!response.data || !response.data.articles) {
          console.log('Invalid response format:', response.data);
          break;
        }

        allArticles = [...allArticles, ...response.data.articles];
        console.log(`Total articles so far: ${allArticles.length}`);

        // Obtener la siguiente URL de paginación
        nextUrl = response.data.serpapi_pagination?.next;
        if (nextUrl) {
          console.log('Next page URL:', nextUrl);
          // Esperar entre peticiones para evitar límites de rate
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } while (nextUrl);

      console.log(`Total articles retrieved: ${allArticles.length}`);
      return {
        articles: allArticles,
        citations: firstResponse.data.cited_by,
        author: firstResponse.data.author,
        coAuthors: firstResponse.data.co_authors
      };
    } catch (error) {
      console.error('Error fetching Scholar data:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          params: error.config?.params ? {
            ...error.config.params,
            api_key: '***'
          } : undefined
        }
      });

      if (error.response?.status === 401) {
        throw new Error('Invalid SerpApi API key');
      } else if (error.response?.status === 404) {
        throw new Error('Author not found on Google Scholar');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Connection timeout - SerpApi is not responding');
      }

      throw new Error(`Error accessing SerpApi: ${error.message}`);
    }
  }

  async processPublications(scholarData) {
    if (!scholarData.articles) return [];

    const { articles, citations, author, coAuthors } = scholarData;
    if (!articles) return [];

    // Crear un mapa de publicaciones existentes por título para comparación rápida
    const existingPublications = ScholarPublication.findAll();

    const existingPublicationsMap = new Map(
      existingPublications.map(pub => [pub.title, pub])
    );

    const publications = articles.map(article => ({
      title: article.title,
      authors: article.authors ? article.authors.split(', ').filter(author => author.trim() !== '') : ['Sin autor'],
      publication: article.publication,
      year: article.year ? parseInt(article.year) : null,
      citations: parseInt(article.cited_by?.value || 0),
      link: article.link,
      lastUpdated: new Date(),
      serpApiData: article,
      totalCitations: citations?.table?.[0]?.citations?.all || 0,
      citationsByYear: citations?.graph || [],
      author: {
        name: author?.name,
        affiliations: author?.affiliations,
        interests: author?.interests?.map(i => i.title) || [],
        totalCitations: citations?.table?.[0]?.citations?.all || 0,
        citationsSince2020: citations?.table?.[0]?.citations?.since_2020 || 0,
        hIndex: citations?.table?.[1]?.h_index?.all || 0,
        hIndexSince2020: citations?.table?.[1]?.h_index?.since_2020 || 0,
        i10Index: citations?.table?.[2]?.i10_index?.all || 0,
        i10IndexSince2020: citations?.table?.[2]?.i10_index?.since_2020 || 0
      },
      coAuthors: coAuthors?.map(coAuthor => ({
        name: coAuthor.name,
        affiliations: coAuthor.affiliations,
        link: coAuthor.link
      })) || []
    }));

    // Separar publicaciones en nuevas y actualizaciones
    const updates = [];
    const newPublications = [];
    
    for (const publication of publications) {
      const existing = existingPublicationsMap.get(publication.title);
      
      if (existing) {
        // Verificar si necesita actualización
        const needsUpdate = 
          existing.citations !== publication.citations ||
          existing.year !== publication.year ||
          existing.link !== publication.link ||
          JSON.stringify(existing.serpApiData) !== JSON.stringify(publication.serpApiData);
        
        if (needsUpdate) {
          updates.push({
            updateOne: {
              filter: { title: existing.title },
              update: publication
            }
          });
        }
      } else {
        newPublications.push(publication);
      }
    }

    return { updates, newPublications };
  }

  async updatePublications(force = false) {
    try {
      console.log('Starting updatePublications with force:', force);
      
      if (!force && !await this.shouldUpdate()) {
        console.log('Skip update: Last update was less than 24 hours ago');
        return false;
      }

      console.log('API Key:', this.API_KEY ? 'Present' : 'Missing');
      console.log('Author ID:', this.AUTHOR_ID);
      console.log(force ? 'Forcing update...' : 'Update needed, proceeding...');
      
      const scholarData = await this.fetchScholarData();
      const { updates, newPublications } = await this.processPublications(scholarData);

      console.log(`Processing ${updates.length} updates and ${newPublications.length} new publications...`);

      // Realizar actualizaciones en lote
      if (updates.length > 0) {
        for (const update of updates) {
          ScholarPublication.update(update.update, { where: update.updateOne.filter });
        }
        console.log(`Updated ${updates.length} existing publications`);
      }

      // Insertar nuevas publicaciones
      if (newPublications.length > 0) {
        ScholarPublication.bulkCreate(newPublications);
        console.log(`Inserted ${newPublications.length} new publications`);
      }

      return true;
    } catch (error) {
      console.error('Error updating publications:', error);
      throw error;
    }
  }

  async getPublications() {
    try {
      console.log('Starting getPublications...');
      
      // Intentar actualizar si es necesario
      console.log('Checking if update is needed...');
      const shouldUpdateResult = await this.shouldUpdate();
      console.log('Should update?', shouldUpdateResult);
      
      if (shouldUpdateResult) {
        console.log('Fetching new data from Scholar API...');
        const scholarData = await this.fetchScholarData();
        console.log('Processing publications...');
        const { updates, newPublications } = await this.processPublications(scholarData);
        
        // Realizar actualizaciones en lote
        if (updates.length > 0) {
          for (const update of updates) {
            ScholarPublication.update(update.update.$set, { where: update.updateOne.filter });
          }
          console.log(`Updated ${updates.length} existing publications`);
        }

        // Insertar nuevas publicaciones
        if (newPublications.length > 0) {
          ScholarPublication.bulkCreate(newPublications);
          console.log(`Inserted ${newPublications.length} new publications`);
        }
      }
      
      // Retornar las publicaciones almacenadas
      console.log('Retrieving publications from database...');
      const result = ScholarPublication.findAll();
      console.log(`Returning ${result.length} publications`);
      return result;
    } catch (error) {
      console.error('Detailed error in getPublications:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }
}

const scholarService = new ScholarService();
export const getPublications = scholarService.getPublications.bind(scholarService);
export const updatePublications = scholarService.updatePublications.bind(scholarService);
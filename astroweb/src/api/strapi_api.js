import axios from 'axios';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

console.log('Configuración de Strapi:', {
  url: STRAPI_URL,
  hasToken: !!STRAPI_TOKEN
});

const axiosInstance = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_TOKEN}`
  }
});

export async function getBiographyDescription() {
  try {
    console.log('Intentando obtener biografía desde:', `${STRAPI_URL}/api/biographies`);
    
    const response = await axiosInstance.get('/api/biographies', {
      params: {
        'populate': '*'
      }
    });
    
    console.log('Respuesta completa:', JSON.stringify(response.data, null, 2));
    
    const biographies = response.data.data;
    console.log('Biografías encontradas:', biographies?.length || 0);

    if (biographies && biographies.length > 0) {
      // Los datos vienen directamente en el primer elemento, no en attributes
      const bio = biographies[0];
      console.log('Biografía encontrada:', bio);
      
      return {
        titulo: bio.titulo || 'Biografía',
        descripcion: bio.descripcion || 'No se encontró ninguna descripción.',
        educacion: bio.educacion || '',
        experiencia_profesional: bio.experiencia_profesional || '',
        investigacion: bio.investigacion || ''
      };
    } else {
      console.log('No se encontraron biografías');
      return {
        titulo: 'Biografía',
        descripcion: 'No se encontró ninguna biografía.',
        educacion: '',
        experiencia_profesional: '',
        investigacion: ''
      };
    }
  } catch (error) {
    console.error('Error al obtener la biografía:', {
      mensaje: error.message,
      respuesta: error.response?.data,
      estado: error.response?.status,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        params: error.config?.params,
        headers: {
          ...error.config?.headers,
          'Authorization': 'Bearer [HIDDEN]'
        }
      }
    });
    
    return {
      titulo: 'Biografía',
      descripcion: `Error al obtener la biografía: ${error.message}`,
      educacion: '',
      experiencia_profesional: '',
      investigacion: ''
    };
  }
}
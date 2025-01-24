// Types
/**
 * @typedef {Object} Publication
 * @property {number} id - Unique identifier
 * @property {string} title - Publication title
 * @property {string[]} authors - List of authors
 * @property {string} [journal] - Journal name (for journal publications)
 * @property {string} [conference] - Conference name (for conference papers)
 * @property {string} [location] - Conference location (for conference papers)
 * @property {number} year - Publication year
 * @property {string} [volume] - Volume number
 * @property {string} [issue] - Issue number
 * @property {string} pages - Page range
 * @property {string} doi - Digital Object Identifier
 * @property {string} abstract - Publication abstract
 * @property {string[]} keywords - List of keywords
 * @property {number} citations - Number of citations
 * @property {'journal'|'conference'} type - Publication type
 */

const CACHE_KEY = 'publications_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * @typedef {Object} PublicationOptions
 * @property {string} [year] - Año de publicación
 * @property {'journal'|'conference'} [type] - Tipo de publicación
 * @property {string} [keyword] - Palabra clave para buscar
 * @property {'year'|'citations'} [sortBy] - Campo por el cual ordenar
 * @property {'asc'|'desc'} [order] - Orden de clasificación
 */

/**
 * Obtiene y filtra las publicaciones
 * @param {PublicationOptions} options - Opciones de filtrado y ordenamiento
 * @returns {Promise<Publication[]>} Array de publicaciones filtradas
 */
export async function getPublications(options = {}) {
    try {
        // En el servidor, retornar directamente los datos filtrados
        if (typeof window === 'undefined') {
            return filterAndSortPublications(publications, options);
        }

        // En el cliente, intentar usar la caché
        const cachedData = getCachedPublications();
        if (cachedData) {
            return filterAndSortPublications(cachedData, options);
        }

        // Si no hay caché, usar los datos estáticos
        const result = filterAndSortPublications(publications, options);

        // Guardar en caché solo en el cliente
        cachePublications(result);

        return result;
    } catch (error) {
        console.error('Error fetching publications:', error);
        throw new Error('Failed to fetch publications. Please try again later.');
    }
}

/**
 * Get publications from cache if valid
 * @returns {Publication[]|null}
 */
function getCachedPublications() {
    if (typeof window === 'undefined') return null;

    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Cache error:', error);
        return null;
    }
}

/**
 * Cache publications data
 * @param {Publication[]} publications
 */
function cachePublications(data) {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.error('Error caching publications:', error);
    }
}

/**
 * Filtra y ordena las publicaciones según las opciones proporcionadas
 * @param {Publication[]} data - Array de publicaciones a filtrar
 * @param {PublicationOptions} options - Opciones de filtrado y ordenamiento
 * @returns {Publication[]} Array de publicaciones filtradas y ordenadas
 */
function filterAndSortPublications(data, options) {
    let filtered = [...data];

    // Apply filters
    if (options.year) {
        const yearNum = parseInt(options.year, 10);
        if (!isNaN(yearNum)) {
            filtered = filtered.filter(pub => pub.year === yearNum);
        }
    }
    if (options.type) {
        filtered = filtered.filter(pub => pub.type === options.type);
    }
    if (options.keyword) {
        const keyword = options.keyword.toLowerCase();
        filtered = filtered.filter(pub =>
            pub.keywords.some(k => k.toLowerCase().includes(keyword)) ||
            pub.title.toLowerCase().includes(keyword)
        );
    }

    // Apply sorting
    const sortBy = options.sortBy || 'year';
    const order = options.order || 'desc';

    filtered.sort((a, b) => {
        const compareValue = order === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? compareValue : -compareValue;
    });

    return filtered;
}

// Publications data
const publications = [
    {
        id: 1,
        title: "Deep Learning Approaches for Biomedical Signal Processing: A Comprehensive Review",
        authors: ["Sánchez-Reolid, R.", "García, A.", "Martínez, M.", "López, J."],
        journal: "IEEE Transactions on Biomedical Engineering",
        year: 2024,
        volume: "71",
        issue: "2",
        pages: "423-438",
        doi: "10.1109/TBME.2023.1234567",
        abstract: "Este artículo presenta una revisión exhaustiva de las técnicas de deep learning aplicadas al procesamiento de señales biomédicas, con énfasis en electrocardiogramas y electroencefalogramas.",
        keywords: ["Deep Learning", "Signal Processing", "Biomedical Engineering", "Neural Networks"],
        citations: 15,
        type: "journal"
    },
    {
        id: 2,
        title: "Real-time ECG Analysis Using Convolutional Neural Networks",
        authors: ["Sánchez-Reolid, R.", "Fernández, E.", "González, C."],
        conference: "International Conference on Biomedical Engineering (ICBE)",
        location: "Barcelona, Spain",
        year: 2023,
        pages: "156-163",
        doi: "10.1145/3456789.0123456",
        abstract: "Presentamos un nuevo enfoque para el análisis de ECG en tiempo real utilizando redes neuronales convolucionales, logrando una precisión del 98% en la detección de arritmias.",
        keywords: ["ECG Analysis", "CNN", "Real-time Processing", "Arrhythmia Detection"],
        citations: 20,
        type: "conference"
    },
    {
        id: 3,
        title: "IoT-based Environmental Monitoring System for Industrial Applications",
        authors: ["Sánchez-Reolid, R.", "Martínez, A.", "López, P.", "García, M."],
        journal: "Sensors",
        year: 2023,
        volume: "23",
        issue: "4",
        pages: "1023-1038",
        doi: "10.3390/s23041023",
        abstract: "Desarrollo e implementación de un sistema de monitorización ambiental basado en IoT para entornos industriales, utilizando una red de sensores inalámbricos y procesamiento en la nube.",
        keywords: ["IoT", "Environmental Monitoring", "Wireless Sensor Networks", "Cloud Computing"],
        citations: 8,
        type: "journal"
    }
];
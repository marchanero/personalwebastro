import type { APIRoute } from 'astro';
import { getPublications } from '../../api/publications';

export const GET: APIRoute = async ({ url }) => {
    try {
        const params = url.searchParams;
        const filters: Record<string, any> = {};

        // Extraer filtros de los parámetros de la URL
        if (params.has('year')) {
            filters.year = parseInt(params.get('year')!);
        }
        if (params.has('type')) {
            filters.type = params.get('type');
        }
        if (params.has('keyword')) {
            filters.keyword = params.get('keyword');
        }
        if (params.has('sortBy')) {
            filters.sortBy = params.get('sortBy');
        }
        if (params.has('order')) {
            filters.order = params.get('order');
        }

        const publications = await getPublications(filters);

        return new Response(JSON.stringify(publications), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // Configurar cache para 1 hora
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.error('Error in publications API:', error);
        return new Response(
            JSON.stringify({
                error: 'Error al obtener las publicaciones',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
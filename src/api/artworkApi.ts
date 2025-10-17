import type { ApiResponse } from '../types/artwork';

export const fetchArtworksFromApi = async (page: number, limit: number): Promise<ApiResponse> => {
    const apiUrl = `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};
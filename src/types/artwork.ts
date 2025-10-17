export interface Artwork {
    id: number;
    title: string;
    place_of_origin: string | null;
    artist_display: string;
    inscriptions: string | null;
    date_start: number;
    date_end: number;
}

export interface PaginationInfo {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
}

export interface ApiResponse {
    pagination: PaginationInfo;
    data: Artwork[];
}

export interface CustomLazyState {
    first: number;
    rows: number;
    page: number;
}
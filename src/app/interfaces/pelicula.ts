export interface Pelicula {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    genres?: any[];
    popularity: number;
    poster_path: string;
    release_date: Date;
    tagline?: string;
    title: string;
    video: boolean;
    videos?: any;
    vote_average: number;
    vote_count: number;
}

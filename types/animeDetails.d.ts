// animeDetails.d.ts

export interface Episodes {
    sub: number;
    dub: number;
    eps: number;
}

export interface Aired {
    from: string;
    to: string | null;
}

export interface AnimeDetails {
    title: string;
    alternativeTitle: string;
    japanese: string;
    id: string;
    poster: string;
    rating: string;
    type: string;
    episodes: Episodes;
    synopsis: string;
    synonyms: string;
    aired: Aired;
    premiered: string;
    duration: string;
    status: string;
    MAL_score: string;
    genres: string[];
    studios: string;
    producers: string[];
}

export interface AnimeDetailsApiResponse {
    status: boolean;
    data: AnimeDetails;
}

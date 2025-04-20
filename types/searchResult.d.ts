// animeApiResponse.d.ts

export interface AnimeApiResponse {
    status: true;
    data: {
        pageInfo: PageInfo;
        response: Anime[];
    };
}

export interface PageInfo {
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
}

export interface Anime {
    title: string;
    alternativeTitle: string;
    id: string; // e.g., "roboticsnotes-2079?ref=search"
    poster: string; // URL string
    episodes: EpisodeCounts;
    type: 'TV' | 'Special' | string; // You can extend with other types like "Movie" etc.
    duration: string; // e.g., "23m"
}

export interface EpisodeCounts {
    sub: number;
    dub: number;
    eps: number;
}

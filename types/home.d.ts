export interface Anime {
    title: string;
    alternativeTitle: string;
    id: string;
    poster: string;
    rank: number;
    type: string; // e.g., "TV", "Movie", etc.
    quality: string; // e.g., "HD"
    duration: string; // e.g., "24m"
    aired: string; // e.g., "Apr 5, 2025"
    synopsis: string;
    episodes: {
        sub: number;
        dub: number;
        eps: number;
    };
}

export interface Top10 {
    today: Anime[];
    week: Anime[];
    month: Anime[];
}

export interface AnimeApiResponse {
    status: boolean;
    data: {
        spotlight: Anime[];
        trending: Anime[];
        topAiring: Anime[];
        mostPopular: Anime[];
        mostFavorite: Anime[];
        latestCompleted: Anime[];
        latestEpisode: Anime[];
        newAdded: Anime[];
        topUpcoming: Anime[];
        top10: Top10;
        genres: string[];
    };
}

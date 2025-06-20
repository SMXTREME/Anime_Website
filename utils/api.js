const redis = require('../redis');

const API_BASE_URL = process.env.API_BASE_URL;
const API_VIDEO = process.env.API_VIDEO;

/**
 * @param {string} endpoint
 * @param {string} api
 * @param {Object} params
 * @returns {Promise<Object>}
 */
async function fetchAnimeData(endpoint, api = API_BASE_URL, params = {}) {
    try {
        const url = `${api}/${endpoint}`;
        const response = await fetch(url, { params });
        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error.message);
        throw {
            message: 'Failed to fetch anime data',
            originalError: error.message,
            status: error.response?.status || 500,
        };
    }
}

/**
 *
 * @returns {import("../types/home").AnimeApiResponse}
 */
async function getHomeData() {
    // const rdsResult = await redis.get('home');
    // if (rdsResult) return await JSON.parse(rdsResult);

    const results = await fetchAnimeData('home');

    // redis.set('home', JSON.stringify(results), 'EX', 86400);
    return results;
}

/**
 *
 * @param {string} id
 * @returns {import('../types/animeDetails').AnimeDetailsApiResponse}
 */
async function getAnimeDetails(id) {
    // const rdsResult = await redis.get(`${id}-AD`);
    // if (rdsResult) return await JSON.parse(rdsResult);

    const result = await fetchAnimeData(`anime/${id}`);

    // redis.set(`${id}-AD`, JSON.stringify(result), 'EX', 3600);

    return result;
}

/**
 *
 * @param {string} q
 * @param {string | number} page
 * @returns {import("../types/searchResult").AnimeApiResponse}
 */
async function getAnimeSearchResult(q, page) {
    q = q.replace(' ', '+');
    const result = await fetchAnimeData(`search?q=${q}&page=${page}`);
    return result;
}

async function getAnimeEpisodeList(id) {
    // const rdsResult = await redis.get(`${id}-AEL`);
    // if (rdsResult) return await JSON.parse(rdsResult);

    const result = await fetchAnimeData(`anime/${id}/episodes`);

    // redis.set(`${id}-AEL`, JSON.stringify(result), 'EX', 3600);

    return result;
}

async function getAnimeEpisodeServer(id) {
    // const rdsResult = await redis.get(`${id}-AES`);
    // if (rdsResult) return await JSON.parse(rdsResult);

    const result = await fetchAnimeData(`episode/servers?animeEpisodeId=${id}`);

    // redis.set(`${id}-AES`, JSON.stringify(result), 'EX', 3600);

    return result;
}

async function getAnimeEpisodeVideo(id, server = 'hd-1', dub_sub = 'sub') {
    // const rdsResult = await redis.get(`${id}-AEV`);
    // if (rdsResult) return await JSON.parse(rdsResult);

    const result = await fetchAnimeData(
        `episode/sources?animeEpisodeId=${id}?server=${server}&category=${dub_sub}`
    );

    // redis.set(`${id}-AEV`, JSON.stringify(result), 'EX', 3600);

    return result;
}

module.exports = {
    getHomeData,
    getAnimeDetails,
    getAnimeSearchResult,
    getAnimeEpisodeList,
    getAnimeEpisodeServer,
    getAnimeEpisodeVideo,
};

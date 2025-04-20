const { Router } = require('express');
const {
    getAnimeEpisodeServer,
    getAnimeEpisodeVideo,
    getAnimeEpisodeList,
    getAnimeDetails,
} = require('../utils/api');
const watchRoutes = Router();

watchRoutes.get('/:id', async (req, res) => {
    const server = req.query?.server || 'hd-1';
    const type = req.query?.type || 'sub';
    const ep = req.query.ep;
    const epsId = `${req.params.id}?ep=${ep}`;

    try {
        // Run these API calls in parallel
        const [detailsResponse, episodeListResponse, serverResponse, videoResponse] =
            await Promise.all([
                getAnimeDetails(req.params.id),
                getAnimeEpisodeList(req.params.id),
                getAnimeEpisodeServer(epsId),
                getAnimeEpisodeVideo(epsId, server, type),
            ]);

        const { title } = detailsResponse.data;
        const { totalEpisodes, episodes } = episodeListResponse.episodes;
        const { sub, dub, raw, episodeNo } = serverResponse.data;
        const { sources, tracks } = videoResponse.data;

        res.render('watch', {
            totalEpisodes,
            episodes,
            sub,
            dub,
            raw,
            episodeNo,
            sources: sources[0].url,
            tracks,
            title,
            epsId,
            server,
            type,
        });
    } catch (error) {
        res.status(500).send('Error loading anime data');
    }
});

module.exports = { watchRoutes };

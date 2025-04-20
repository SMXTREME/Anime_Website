const { Router } = require('express');
const { getAnimeDetails, getAnimeEpisodeList } = require('../utils/api');
const animeRoutes = Router();

animeRoutes.get('/:id', async (req, res) => {
    let { poster, title, type, episodes, status, MAL_score, synopsis, related, id } = (
        await getAnimeDetails(req.params.id)
    ).data;
    const result = await getAnimeEpisodeList(req.params.id);
    const firstEpisodeId = result.episodes.episodes[0].episodeId;

    related = related.slice(0, 10);

    res.render('anime', {
        poster,
        title,
        type,
        episodes,
        status,
        MAL_score,
        synopsis,
        related,
        id,
        firstEpisodeId,
    });
});

module.exports = { animeRoutes };

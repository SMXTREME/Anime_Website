const { Router } = require('express');
const { getAnimeDetails, getAnimeEpisodeList } = require('../utils/api');
const animeRoutes = Router();

animeRoutes.get('/:id', async (req, res) => {
    const {
        anime: {
            info: {
                poster,
                name,
                stats: { type, episodes },
                description,
                id,
            },
            moreInfo: { status, malscore },
        },
        relatedAnimes,
    } = (await getAnimeDetails(req.params.id)).data;
    const result = (await getAnimeEpisodeList(req.params.id)).data;
    const firstEpisodeId = result.episodes[0].episodeId;

    related = relatedAnimes.slice(0, 10);

    res.render('anime', {
        poster,
        name,
        type,
        episodes,
        status,
        malscore,
        description,
        related,
        id,
        firstEpisodeId,
    });
});

module.exports = { animeRoutes };

const { Router } = require('express');
const { getHomeData, getAnimeDetails } = require('../utils/api');
const indexRoutes = Router();

indexRoutes.get('/', async (req, res) => {
    let { topAiringAnimes, mostPopularAnimes } = (await getHomeData()).data;
    const { poster: featuredAnimePoster } = (
        await getAnimeDetails('sword-art-online-2274?ref=search')
    ).data;

    res.render('index', {
        topAiringAnimes,
        mostPopularAnimes,
        featuredAnimePoster,
    });
});

module.exports = { indexRoutes };

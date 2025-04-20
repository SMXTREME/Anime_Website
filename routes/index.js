const { Router } = require('express');
const { getHomeData, getAnimeDetails } = require('../utils/api');
const indexRoutes = Router();

indexRoutes.get('/', async (req, res) => {
    let { topAiring, mostPopular } = (await getHomeData()).data;
    const { poster: featuredAnimePoster } = (
        await getAnimeDetails('sword-art-online-2274?ref=search')
    ).data;

    res.render('index', {
        topAiring,
        mostPopular,
        featuredAnimePoster,
    });
});

module.exports = { indexRoutes };

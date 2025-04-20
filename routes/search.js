const { Router } = require('express');
const { getAnimeSearchResult } = require('../utils/api');
const searchRoutes = Router();

searchRoutes.get('/', async (req, res) => {
    const q = req.query?.q;
    const p = req.query?.page;
    const response = await getAnimeSearchResult(q, p);
    let results = [];
    let pageInfo = {
        totalPages: 1,
        currentPage: 1,
        hasNextPage: false,
    };
    let numberOfResultsFound = 0;

    if (response?.data) {
        results = response.data.response;
        pageInfo = response.data.pageInfo;
        numberOfResultsFound = response.data.response.length;
    }

    if (numberOfResultsFound === 0) numberOfResultsFound = 'No';
    res.render('search', {
        q,
        p,
        numberOfResultsFound,
        pageInfo,
        results,
    });
});

module.exports = { searchRoutes };

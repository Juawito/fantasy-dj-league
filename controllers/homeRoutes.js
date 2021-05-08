const router = require('express').router();
const path = require('path');

router.get('/', async (req, res) => {
    res.render('homepage');
})
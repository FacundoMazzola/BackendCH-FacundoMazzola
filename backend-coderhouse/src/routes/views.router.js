const express = require('express');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const pm = new ProductManager();

router.get('/', async (req, res) => {
    const products = await pm.getAll();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
});

router.get('/cart', (req, res) => {
    res.render('cart');
});

module.exports = router;


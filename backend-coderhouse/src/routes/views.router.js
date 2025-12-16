const express = require('express');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const pm = new ProductManager();

// HOME
router.get('/', async (req, res) => {
    const products = await pm.getAll();
    res.render('home', { products });
});

// REAL TIME
router.get('/realtimeproducts', async (req, res) => {
    const products = await pm.getAll();
    res.render('realTimeProducts', { products });
});

module.exports = router;

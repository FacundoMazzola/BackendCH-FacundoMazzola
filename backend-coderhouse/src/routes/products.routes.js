const express = require('express');
const Product = require('../models/Product.model');

const router = express.Router();

/**
 * GET /api/products
 */
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json({
        status: 'success',
        payload: products
    });
});

/**
 * POST /api/products
 */
router.post('/', async (req, res) => {
    const product = await Product.create(req.body);
    res.json({
        status: 'success',
        payload: product
    });
});

module.exports = router;


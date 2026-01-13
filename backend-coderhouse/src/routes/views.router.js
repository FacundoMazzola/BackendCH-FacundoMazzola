const express = require('express');
const ProductManager = require('../managers/ProductManager');
const CartManager = require('../managers/CartManager');

const router = express.Router();
const pm = new ProductManager();
const cm = new CartManager();

router.get('/products', async (req, res) => {
    const data = await pm.getProducts(req.query);
    res.render('index', data);
});

router.get('/products/:pid', async (req, res) => {
    const product = await pm.getById(req.params.pid);
    res.render('productDetail', { product });
});

router.get('/carts/:cid', async (req, res) => {
    const cart = await cm.getCartById(req.params.cid);
    res.render('cart', cart);
});

module.exports = router;

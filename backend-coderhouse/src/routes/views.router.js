const express = require('express');
const ProductModel = require('../models/Product.model');

const router = express.Router();

// LISTADO DE PRODUCTOS CON PAGINACIÓN
router.get('/products', async (req, res) => {
    const { page = 1 } = req.query;

    const products = await ProductModel.paginate(
        {},
        { page, limit: 2, lean: true }
    );

    res.render('index', {
        products: products.docs,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page
    });
});

// VISTA DE CARRITO
router.get('/carts/:cid', (req, res) => {
    res.render('cart', { cartId: req.params.cid });
});

module.exports = router;

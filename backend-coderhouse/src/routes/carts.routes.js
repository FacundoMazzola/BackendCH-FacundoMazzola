const express = require('express');
const Cart = require('../models/Cart.model');

const router = express.Router();

// Crear carrito
router.post('/', async (req, res) => {
    const cart = await Cart.create({ products: [] });
    res.json(cart);
});

// Ver carrito con populate
router.get('/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    res.json(cart);
});

// Agregar producto
router.post('/:cid/products/:pid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid);

    const productIndex = cart.products.findIndex(
        p => p.product.toString() === req.params.pid
    );

    if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
    } else {
        cart.products.push({ product: req.params.pid });
    }

    await cart.save();
    res.json(cart);
});

// Eliminar producto
router.delete('/:cid/products/:pid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    cart.products = cart.products.filter(
        p => p.product.toString() !== req.params.pid
    );
    await cart.save();
    res.json(cart);
});

// Vaciar carrito
router.delete('/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    cart.products = [];
    await cart.save();
    res.json(cart);
});

module.exports = router;


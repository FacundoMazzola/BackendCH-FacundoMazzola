const express = require('express');
const Cart = require('../models/Cart.model');
require('../models/Product.model');


const router = express.Router();

router.post('/', async (req, res) => {
    const cart = await Cart.create({ products: [] });
    res.json(cart);
});

router.get('/', async (req, res) => {
    const carts = await Cart.find().populate('products.product');
    res.json(carts);
});

router.get('/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    res.json(cart);
});

router.post('/:cid/products/:pid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid);

    const productIndex = cart.products.findIndex(
        p => p.product.toString() === req.params.pid
    );

    if (productIndex === -1) {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    } else {
        cart.products[productIndex].quantity++;
    }

    await cart.save();
    res.json(cart);
});

router.delete('/:cid/products/:pid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json(cart);
});

router.delete('/:cid', async (req, res) => {
    await Cart.findByIdAndUpdate(req.params.cid, { products: [] });
    res.json({ message: 'Carrito vaciado' });
});

module.exports = router;




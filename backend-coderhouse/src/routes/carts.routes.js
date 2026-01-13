const express = require('express');
const CartManager = require('../managers/CartManager');

const router = express.Router();
const cm = new CartManager();

router.post('/', async (req, res) => {
    const cart = await cm.createCart();
    res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cm.getCartById(req.params.cid);
    res.json(cart);
});

router.post('/:cid/products/:pid', async (req, res) => {
    await cm.addProduct(req.params.cid, req.params.pid);
    res.json({ status: 'success' });
});

router.delete('/:cid/products/:pid', async (req, res) => {
    await cm.deleteProduct(req.params.cid, req.params.pid);
    res.json({ status: 'success' });
});

router.put('/:cid', async (req, res) => {
    const cart = await cm.updateCart(req.params.cid, req.body.products);
    res.json(cart);
});

router.put('/:cid/products/:pid', async (req, res) => {
    const cart = await cm.updateQuantity(
        req.params.cid,
        req.params.pid,
        req.body.quantity
    );
    res.json(cart);
});

router.delete('/:cid', async (req, res) => {
    const cart = await cm.clearCart(req.params.cid);
    res.json(cart);
});

module.exports = router;



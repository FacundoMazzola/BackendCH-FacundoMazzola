const express = require('express');
const Cart = require('../models/Cart.model');
require('../models/Product.model'); // necesario para populate

const router = express.Router();

/* =========================
   CREAR CARRITO
========================= */
router.post('/', async (req, res) => {
    try {
        const cart = await Cart.create({ products: [] });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear carrito' });
    }
});

/* =========================
   OBTENER TODOS LOS CARRITOS
========================= */
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('products.product');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener carritos' });
    }
});

/* =========================
   OBTENER CARRITO POR ID
========================= */
router.get('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: 'ID de carrito inválido' });
    }
});

/* =========================
   AGREGAR PRODUCTO AL CARRITO
========================= */
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(
            p => p.product.toString() === pid
        );

        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: 'Error al agregar producto al carrito' });
    }
});

/* =========================
   ACTUALIZAR TODO EL CARRITO
========================= */
router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'products debe ser un array' });
        }

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        cart.products = products;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el carrito' });
    }
});

/* =========================
   ACTUALIZAR CANTIDAD DE PRODUCTO
========================= */
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Cantidad inválida' });
        }

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const product = cart.products.find(
            p => p.product.toString() === pid
        );

        if (!product) {
            return res.status(404).json({ error: 'Producto no existe en el carrito' });
        }

        product.quantity = quantity;
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar cantidad' });
    }
});

/* =========================
   ELIMINAR PRODUCTO DEL CARRITO
========================= */
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        cart.products = cart.products.filter(
            p => p.product.toString() !== pid
        );

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar producto' });
    }
});

/* =========================
   VACIAR CARRITO
========================= */
router.delete('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        cart.products = [];
        await cart.save();

        res.json({ message: 'Carrito vaciado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al vaciar carrito' });
    }
});

module.exports = router;

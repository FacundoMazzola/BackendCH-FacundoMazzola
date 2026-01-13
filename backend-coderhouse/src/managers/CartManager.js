const Cart = require('../models/Cart.model');

class CartManager {

    async createCart() {
        return Cart.create({ products: [] });
    }

    async getCartById(cid) {
        return Cart.findById(cid).populate('products.product').lean();
    }

    async addProduct(cid, pid) {
        const cart = await Cart.findById(cid);
        const productIndex = cart.products.findIndex(
            p => p.product.toString() === pid
        );

        if (productIndex >= 0) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        return cart.save();
    }

    async deleteProduct(cid, pid) {
        return Cart.findByIdAndUpdate(
            cid,
            { $pull: { products: { product: pid } } },
            { new: true }
        );
    }

    async updateCart(cid, products) {
        return Cart.findByIdAndUpdate(
            cid,
            { products },
            { new: true }
        );
    }

    async updateQuantity(cid, pid, quantity) {
        const cart = await Cart.findById(cid);
        const product = cart.products.find(
            p => p.product.toString() === pid
        );
        product.quantity = quantity;
        return cart.save();
    }

    async clearCart(cid) {
        return Cart.findByIdAndUpdate(
            cid,
            { products: [] },
            { new: true }
        );
    }
}

module.exports = CartManager;



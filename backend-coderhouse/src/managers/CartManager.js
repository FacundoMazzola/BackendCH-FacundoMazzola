const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '../data/carts.json');
    }

    async getCarts() {
        if (!fs.existsSync(this.path)) return [];
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data || '[]');
    }

    async saveCarts(carts) {
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        );
    }

    async createCart() {
        const carts = await this.getCarts();

        const newCart = {
            id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
            products: []
        };

        carts.push(newCart);
        await this.saveCarts(carts);

        return newCart;
    }

    async getCartById(cid) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === Number(cid));
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === Number(cid));

        if (!cart) return null;

        const productIndex = cart.products.findIndex(
            p => p.product === Number(pid)
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({
                product: Number(pid),
                quantity: 1
            });
        }

        await this.saveCarts(carts);
        return cart;
    }
}

module.exports = CartManager;


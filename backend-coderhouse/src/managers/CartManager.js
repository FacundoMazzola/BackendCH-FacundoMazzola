const fs = require('fs').promises;
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '..', 'data', 'carts.json');
    }

    async getAll() {
        const data = await fs.readFile(this.path, 'utf8');
        return JSON.parse(data);
    }

    async saveAll(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    async createCart() {
        const carts = await this.getAll();
        const id = carts.length ? carts[carts.length - 1].id + 1 : 1;

        const newCart = { id, products: [] };
        carts.push(newCart);
        await this.saveAll(carts);

        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getAll();
        return carts.find(c => c.id === parseInt(id));
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getAll();
        const cart = carts.find(c => c.id === parseInt(cid));

        if (!cart) return null;

        const item = cart.products.find(p => p.product === parseInt(pid));

        if (item) item.quantity++;
        else cart.products.push({ product: parseInt(pid), quantity: 1 });

        await this.saveAll(carts);
        return cart;
    }
}

module.exports = CartManager;

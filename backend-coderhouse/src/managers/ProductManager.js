const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '..', 'data', 'products.json');
    }

    async getAll() {
        const data = await fs.readFile(this.path, 'utf8');
        return JSON.parse(data);
    }

    async getById(id) {
        const products = await this.getAll();
        return products.find(p => p.id === parseInt(id));
    }

    async saveAll(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async addProduct(product) {
        const products = await this.getAll();
        const id = products.length ? products[products.length - 1].id + 1 : 1;

        const newProduct = { id, ...product };
        products.push(newProduct);
        await this.saveAll(products);

        return newProduct;
    }

    async updateProduct(id, data) {
        const products = await this.getAll();
        const index = products.findIndex(p => p.id === parseInt(id));

        if (index === -1) return null;

        products[index] = { ...products[index], ...data };
        await this.saveAll(products);

        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getAll();
        const filtered = products.filter(p => p.id !== parseInt(id));

        if (filtered.length === products.length) return null;

        await this.saveAll(filtered);
        return true;
    }
}

module.exports = ProductManager;

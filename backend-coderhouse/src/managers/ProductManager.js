const fs = require('fs/promises');
const path = require('path');

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '../data/products.json');
    }

    async getAll() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data || '[]');
    }

    async save(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async addProduct(data) {
        const products = await this.getAll();

        const newProduct = {
            id: Date.now().toString(),
            title: data.title,
            description: data.description,
            price: Number(data.price),
            image: data.image,
            status: true
        };

        products.push(newProduct);
        await this.save(products);
        return newProduct;
    }

    async getById(id) {
        const products = await this.getAll();
        return products.find(p => p.id === id);
    }

    async deleteProduct(id) {
        const products = await this.getAll();
        const filtered = products.filter(p => p.id !== id);
        await this.save(filtered);
    }
}

module.exports = ProductManager;

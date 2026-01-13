const ProductModel = require('../models/Product.model');

class ProductManager {

    async getProducts(query, options) {
        return await ProductModel.paginate(query, options);
    }

    async getById(pid) {
        return await ProductModel.findById(pid);
    }

    async createProduct(data) {
        return await ProductModel.create(data);
    }

    async updateProduct(pid, data) {
        return await ProductModel.findByIdAndUpdate(pid, data, { new: true });
    }

    async deleteProduct(pid) {
        return await ProductModel.findByIdAndDelete(pid);
    }
}

module.exports = ProductManager;



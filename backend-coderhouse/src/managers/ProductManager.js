const Product = require('../models/Product.model');

class ProductManager {

    async getProducts({ limit = 10, page = 1, sort, query }) {

        const filter = {};
        if (query) {
            filter.$or = [
                { category: query },
                { status: query === 'true' }
            ];
        }

        const options = {
            limit: Number(limit),
            page: Number(page),
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        const result = await Product.paginate(filter, options);

        return {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage
                ? `/api/products?page=${result.prevPage}`
                : null,
            nextLink: result.hasNextPage
                ? `/api/products?page=${result.nextPage}`
                : null
        };
    }

    async getById(id) {
        return Product.findById(id);
    }

    async addProduct(data) {
        return Product.create(data);
    }

    async updateProduct(id, data) {
        return Product.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteProduct(id) {
        return Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManager;


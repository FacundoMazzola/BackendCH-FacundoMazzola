const express = require('express');
const Product = require('../models/Product.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {
            limit = 10,
            page = 1,
            sort,
            query
        } = req.query;

        const filter = {};

        if (query) {
            filter.category = query;
        }

        const options = {
            limit: parseInt(limit),
            skip: (page - 1) * limit
        };

        let queryExec = Product.find(filter);

        if (sort === 'asc') queryExec = queryExec.sort({ price: 1 });
        if (sort === 'desc') queryExec = queryExec.sort({ price: -1 });

        const products = await queryExec
            .limit(options.limit)
            .skip(options.skip);

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage: page > 1 ? Number(page) - 1 : null,
            nextPage: page < totalPages ? Number(page) + 1 : null,
            page: Number(page),
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/api/products?page=${page - 1}` : null,
            nextLink: page < totalPages ? `/api/products?page=${Number(page) + 1}` : null
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

module.exports = router;


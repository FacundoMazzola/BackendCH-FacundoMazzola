const express = require('express');
const Product = require('../models/Product.model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let {
            limit = 10,
            page = 1,
            sort,
            query
        } = req.query;

        limit = Number(limit);
        page = Number(page);

        const filter = {};

        // Filtro por categoría o disponibilidad
        if (query) {
            if (query === 'true' || query === 'false') {
                filter.status = query === 'true';
            } else {
                filter.category = query;
            }
        }

        // Ordenamiento por precio
        let sortOption = {};
        if (sort === 'asc') sortOption.price = 1;
        if (sort === 'desc') sortOption.price = -1;

        const result = await Product.paginate(filter, {
            limit,
            page,
            sort: sortOption,
            lean: true
        });

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage
                ? `http://localhost:8080/api/products?page=${result.prevPage}`
                : null,
            nextLink: result.hasNextPage
                ? `http://localhost:8080/api/products?page=${result.nextPage}`
                : null
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});

/**
 * POST /api/products
 */
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;





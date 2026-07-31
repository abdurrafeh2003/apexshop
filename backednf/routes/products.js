const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/products
// Supports searching via query parameter: ?search=iphone
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = 'SELECT * FROM products';
        let queryParams = [];

        if (search) {
            query += ' WHERE title LIKE ? OR description LIKE ?';
            queryParams = [`%${search}%`, `%${search}%`];
        }

        query += ' ORDER BY id DESC';

        const [products] = await db.query(query, queryParams);
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        console.error('Fetch products error:', err);
        res.status(500).json({ success: false, message: 'Internal server error fetching products.' });
    }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.status(200).json({
            success: true,
            product: products[0]
        });
    } catch (err) {
        console.error('Fetch product detail error:', err);
        res.status(500).json({ success: false, message: 'Internal server error fetching product details.' });
    }
});

module.exports = router;

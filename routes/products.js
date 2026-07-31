const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

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

// POST /api/products
router.post('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { title, description, price, stock, image_url } = req.body;

        if (!title || !description || price === undefined || stock === undefined) {
            return res.status(400).json({ success: false, message: 'Title, description, price, and stock are required.' });
        }

        const [result] = await db.query(
            'INSERT INTO products (title, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
            [title, description, Number(price), Number(stock), image_url || '']
        );

        res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            productId: result.insertId
        });
    } catch (err) {
        console.error('Create product error:', err);
        res.status(500).json({ success: false, message: 'Internal server error creating product.' });
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

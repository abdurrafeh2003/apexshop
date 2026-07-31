const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// POST /api/orders
// Checkout API: performs database transaction to ensure data integrity
router.post('/', authenticateToken, async (req, res) => {
    const { items, payment_method } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Shopping cart is empty.' });
    }

    if (!payment_method) {
        return res.status(400).json({ success: false, message: 'Payment method is required.' });
    }

    // Get connection from pool for transaction management
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        let totalAmount = 0;
        const itemsToInsert = [];

        // Verify products existence, validate stock, compute price, and deduct stock
        for (const item of items) {
            const { product_id, quantity } = item;

            if (!product_id || !quantity || quantity <= 0) {
                throw new Error('Invalid product or quantity in cart.');
            }

            // Fetch and lock the product row for update (prevents concurrent stock race conditions)
            const [products] = await connection.query(
                'SELECT id, title, price, stock FROM products WHERE id = ? FOR UPDATE',
                [product_id]
            );

            if (products.length === 0) {
                throw new Error(`Product not found.`);
            }

            const product = products[0];

            if (product.stock < quantity) {
                throw new Error(`Insufficient stock for "${product.title}". Only ${product.stock} left in stock.`);
            }

            const itemTotalPrice = Number(product.price) * quantity;
            totalAmount += itemTotalPrice;

            // Deduct stock
            await connection.query(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [quantity, product_id]
            );

            // Prepare order item record
            itemsToInsert.push({
                product_id,
                quantity,
                unit_price: product.price
            });
        }

        // Insert order record
        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total_amount, status, payment_method) VALUES (?, ?, ?, ?)',
            [req.user.id, totalAmount, 'completed', payment_method]
        );

        const orderId = orderResult.insertId;

        // Insert order items
        for (const item of itemsToInsert) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.unit_price]
            );
        }

        // Commit transaction
        await connection.commit();
        res.status(201).json({
            success: true,
            message: 'Checkout completed successfully. Order placed!',
            orderId,
            totalAmount
        });

    } catch (err) {
        // Rollback transaction on failure
        await connection.rollback();
        console.error('Checkout Transaction Rolled Back due to Error:', err.message);
        res.status(400).json({ success: false, message: err.message || 'An error occurred during checkout.' });
    } finally {
        // Release connection back to pool
        connection.release();
    }
});

// GET /api/orders/user
// Fetch orders for current logged-in user, joining items and product details
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const query = `
            SELECT 
                o.id AS order_id, 
                o.total_amount, 
                o.status, 
                o.payment_method, 
                o.created_at,
                oi.id AS item_id, 
                oi.product_id, 
                oi.quantity, 
                oi.unit_price, 
                p.title AS product_title, 
                p.image_url
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `;

        const [rows] = await db.query(query, [req.user.id]);

        // Group rows by order_id to construct a clean nested response structure
        const ordersMap = {};

        for (const row of rows) {
            const {
                order_id,
                total_amount,
                status,
                payment_method,
                created_at,
                item_id,
                product_id,
                quantity,
                unit_price,
                product_title,
                image_url
            } = row;

            if (!ordersMap[order_id]) {
                ordersMap[order_id] = {
                    id: order_id,
                    total_amount,
                    status,
                    payment_method,
                    created_at,
                    items: []
                };
            }

            if (item_id) {
                ordersMap[order_id].items.push({
                    id: item_id,
                    product_id,
                    product_title,
                    image_url,
                    quantity,
                    unit_price
                });
            }
        }

        const ordersList = Object.values(ordersMap);

        res.status(200).json({
            success: true,
            orders: ordersList
        });

    } catch (err) {
        console.error('Fetch user orders error:', err);
        res.status(500).json({ success: false, message: 'Internal server error fetching order history.' });
    }
});

module.exports = router;

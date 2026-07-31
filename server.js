const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'frontend')));

// Health Check API
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'E-commerce API is running.' });
});

app.post('/api/chatbot', (req, res) => {
    const message = (req.body && req.body.message ? String(req.body.message) : '').trim().toLowerCase();

    let reply = 'I can help you browse products, check your cart, place orders, or answer shipping questions.';

    if (!message) {
        reply = 'How can I help with your shopping today?';
    } else if (message.includes('order') || message.includes('tracking') || message.includes('delivery')) {
        reply = 'You can place an order from the catalog and review your recent purchases in the profile view. If you need shipment details, I can help you check the expected delivery flow.';
    } else if (message.includes('shipping') || message.includes('return') || message.includes('refund')) {
        reply = 'Our store supports standard shipping and straightforward returns for eligible items. I can help you understand the next step if you need a refund or exchange.';
    } else if (message.includes('cart') || message.includes('checkout') || message.includes('payment')) {
        reply = 'You can review your cart, adjust quantities, and continue to checkout from the cart drawer. The checkout flow is built to guide you through payment and delivery details.';
    } else if (message.includes('product') || message.includes('recommend') || message.includes('find') || message.includes('gadget') || message.includes('keyboard') || message.includes('apparel')) {
        reply = 'We offer premium gadgets, accessories, mechanical keyboards, and apparel. Try searching the catalog or tell me your budget and I will suggest a few options.';
    } else if (message.includes('login') || message.includes('account') || message.includes('sign in')) {
        reply = 'You can sign in or register from the top-right auth button. Once logged in, you can view your profile and order history.';
    } else if (message.includes('price') || message.includes('cheap') || message.includes('budget')) {
        reply = 'You can sort products by price in the catalog to quickly compare affordable and premium options.';
    }

    res.json({ success: true, reply });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Fallback to serving index.html for undefined frontend routes (SPA client-side routing support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

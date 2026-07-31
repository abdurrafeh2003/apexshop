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
// Resolves to ../frontend relative to C:\Users\PC\.gemini\antigravity\scratch\ecommerce-app\backend
app.use(express.static(path.join(__dirname, '../frontend')));

// Health Check API
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'E-commerce API is running.' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Fallback to serving index.html for undefined frontend routes (SPA client-side routing support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

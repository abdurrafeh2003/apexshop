-- E-Commerce Application Database Seeds
-- Database Name: ecommerce_db

USE ecommerce_db;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Seed Users
-- Password is 'password123' (hash generated using bcryptjs)
INSERT INTO users (name, email, password_hash, role) VALUES
('Jane Doe (Customer)', 'customer@example.com', '$2a$10$RrLUeIWSeFwIokNOn/kMIOILgiJJ/5EBH7DYtA3DAJLo9pj2p3/Oe', 'customer'),
('Admin User', 'admin@example.com', '$2a$10$RrLUeIWSeFwIokNOn/kMIOILgiJJ/5EBH7DYtA3DAJLo9pj2p3/Oe', 'admin');

-- Seed Products
INSERT INTO products (title, description, price, stock, image_url) VALUES
(
    'iPhone 15 Pro Max',
    'Experience the ultimate iPhone. Powered by the A17 Pro chip, featuring a lightweight titanium design, a powerful 48MP main camera system, and USB-C speed support.',
    1199.99,
    15,
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60'
),
(
    'Sony WH-1000XM5 Headphones',
    'Industry-leading noise canceling wireless over-ear headphones with auto noise canceling optimizer, crystal clear hands-free calling, and Alexa voice control.',
    348.00,
    25,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
),
(
    'Nike Air Max Premium',
    'Classic running shoes featuring modern lightweight cushioning, durable textile and leather upper, and iconic Air Max units for maximum style and comfort.',
    149.99,
    40,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'
),
(
    'Keychron K2 Mechanical Keyboard',
    'A 75% layout wireless mechanical keyboard with Gateron G Pro switches, compatible with Mac and Windows, featuring elegant white LED backlighting.',
    89.99,
    30,
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60'
),
(
    'Ergonomic Office Chair',
    'High-back desk chair featuring mesh breathability, adjustable lumbar support, 3D armrests, and 120-degree tilt for maximum work productivity.',
    199.50,
    10,
    'https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=500&auto=format&fit=crop&q=60'
),
(
    'Hydro Flask Wide Mouth Bottle',
    'TempShield double-wall vacuum insulated stainless steel water bottle. Includes a leakproof Flex Cap to keep beverages cold up to 24 hours or hot up to 12 hours.',
    44.95,
    50,
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60'
),
(
    'Dell UltraSharp 27" 4K Monitor',
    'Premium 27-inch 4K USB-C Hub monitor with brilliant color coverage, ComfortView Plus, and extensive connectivity options including power delivery up to 90W.',
    479.99,
    12,
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60'
),
(
    'Kindle Paperwhite (16 GB)',
    'Now with a 6.8" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns for the ultimate reading experience.',
    149.99,
    18,
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60'
);

// ApexStore - Client Application Logic

// 1. App State
const state = {
    products: [],
    cart: [],
    user: null,
    token: null,
    currentView: 'shop', // 'shop' or 'profile'
    apiBase: (typeof window !== 'undefined' && window.__API_BASE__) || '/api'
};

function getDemoProducts() {
    return [
        {
            id: 1,
            title: 'iPhone 15 Pro Max',
            description: 'Premium flagship phone with titanium design and advanced camera system.',
            price: 1199.99,
            stock: 15,
            image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 2,
            title: 'Sony WH-1000XM5 Headphones',
            description: 'Industry-leading noise canceling headphones with crystal clear audio.',
            price: 348.00,
            stock: 25,
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 3,
            title: 'Nike Air Max Premium',
            description: 'Classic running shoes with bold cushioning and modern comfort.',
            price: 149.99,
            stock: 40,
            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 4,
            title: 'Keychron K2 Mechanical Keyboard',
            description: 'Wireless mechanical keyboard with a sleek premium layout.',
            price: 89.99,
            stock: 30,
            image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 5,
            title: 'Apple Watch Ultra 2',
            description: 'Rugged smartwatch with precision tracking and all-day battery life.',
            price: 799.00,
            stock: 18,
            image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 6,
            title: 'Canon EOS R10',
            description: 'Mirrorless camera designed for creators with crisp image quality.',
            price: 979.00,
            stock: 12,
            image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 7,
            title: 'Lululemon Everyday Jacket',
            description: 'Lightweight jacket crafted for comfort, style, and daily wear.',
            price: 128.00,
            stock: 22,
            image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 8,
            title: 'Apex Studio Desk Lamp',
            description: 'Minimal desk lamp with adjustable lighting for productivity and focus.',
            price: 59.99,
            stock: 35,
            image_url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 9,
            title: 'Samsung Galaxy Tab S9',
            description: 'Slim tablet with vivid display and seamless productivity features.',
            price: 749.00,
            stock: 16,
            image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 10,
            title: 'Bose QuietComfort Earbuds',
            description: 'Compact earbuds with rich sound and excellent noise reduction.',
            price: 249.00,
            stock: 20,
            image_url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 11,
            title: 'Herman Miller Chair',
            description: 'Ergonomic office chair designed for comfort and posture support.',
            price: 499.00,
            stock: 10,
            image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 12,
            title: 'Beats Studio Pro',
            description: 'Premium over-ear headphones with immersive sound and modern design.',
            price: 349.99,
            stock: 14,
            image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 13,
            title: 'Anker 737 Charger',
            description: 'High-power charging station built for multiple devices at once.',
            price: 99.99,
            stock: 28,
            image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 14,
            title: 'Nordic Office Backpack',
            description: 'Minimalist backpack with smart storage and premium finish.',
            price: 89.00,
            stock: 24,
            image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 15,
            title: 'Logitech MX Anywhere 3S',
            description: 'Compact wireless mouse for precision control on the move.',
            price: 79.99,
            stock: 26,
            image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 16,
            title: 'Philips Hue Lamp',
            description: 'Smart ambient lighting with customizable colors for your space.',
            price: 129.99,
            stock: 18,
            image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60'
        },
        {
            id: 17,
            title: 'Oura Ring Gen3',
            description: 'Advanced health tracking ring with sleep and recovery insights.',
            price: 299.00,
            stock: 13,
            image_url: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500&auto=format&fit=crop&q=60'
        }
    ];
}

function syncCartFromStorage() {
    try {
        const storedCart = localStorage.getItem('apex_cart');
        if (storedCart) {
            state.cart = JSON.parse(storedCart);
        } else {
            state.cart = [];
        }
    } catch (error) {
        console.error('Failed to load cart from storage:', error);
        state.cart = [];
    }

    renderCart();
}

// 2. Initialization
document.addEventListener('DOMContentLoaded', async () => {
    // Re-verify Lucide Icons rendering
    lucide.createIcons();

    // Load session from localStorage
    state.token = localStorage.getItem('apex_token');
    const storedUser = localStorage.getItem('apex_user');
    if (storedUser) {
        state.user = JSON.parse(storedUser);
    }

    // Load cart from localStorage
    syncCartFromStorage();

    // Update Navigation UI based on Auth State
    updateAuthNavUI();

    // Bind event listeners
    bindEvents();
    initChatbot();

    // Fetch and render initial products
    await loadProducts();

    // Render cart items if any exist
    renderCart();

    window.addEventListener('storage', syncCartFromStorage);
    window.addEventListener('apex:cart-updated', syncCartFromStorage);
});

// 3. Event Listeners Binding
function bindEvents() {
    // Logo & Shop click to reset views
    document.getElementById('nav-logo').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('shop');
    });
    document.getElementById('nav-shop').addEventListener('click', (e) => {
        e.preventDefault();
        switchView('shop');
    });

    // Search event (Desktop)
    const searchInput = document.getElementById('search-input');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            await loadProducts(e.target.value);
        }, 400);
    });

    // Mobile Search toggle
    const mobileSearchTrigger = document.getElementById('mobile-search-trigger');
    const mobileSearchBar = document.getElementById('mobile-search-bar');
    mobileSearchTrigger.addEventListener('click', () => {
        mobileSearchBar.classList.toggle('hidden');
        if (!mobileSearchBar.classList.contains('hidden')) {
            document.getElementById('mobile-search-input').focus();
        }
    });

    // Search event (Mobile Dropdown)
    const mobileSearchInput = document.getElementById('mobile-search-input');
    mobileSearchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            await loadProducts(e.target.value);
        }, 400);
    });

    // Search event (Mobile Inline)
    const mobileInlineSearch = document.getElementById('mobile-inline-search');
    mobileInlineSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            await loadProducts(e.target.value);
        }, 400);
    });

    // Sorting Select Change
    document.getElementById('sort-select').addEventListener('change', () => {
        sortAndRenderProducts();
    });

    // Cart Trigger (Open Drawer)
    document.getElementById('cart-trigger').addEventListener('click', () => toggleCartDrawer(true));
    document.getElementById('cart-close').addEventListener('click', () => toggleCartDrawer(false));
    document.getElementById('cart-drawer-overlay').addEventListener('click', () => toggleCartDrawer(false));

    // Auth Trigger & Modals
    const authModal = document.getElementById('auth-modal');
    document.getElementById('auth-trigger').addEventListener('click', () => toggleAuthModal(true));
    document.getElementById('auth-modal-close').addEventListener('click', () => toggleAuthModal(false));
    
    // Auth Modal tab switching
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    tabLogin.addEventListener('click', () => {
        tabLogin.className = "flex-1 py-4 text-brandAccent border-b-2 border-brandAccent";
        tabRegister.className = "flex-1 py-4 text-gray-400 border-b-2 border-transparent hover:text-white transition-colors";
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    tabRegister.addEventListener('click', () => {
        tabRegister.className = "flex-1 py-4 text-brandAccent border-b-2 border-brandAccent";
        tabLogin.className = "flex-1 py-4 text-gray-400 border-b-2 border-transparent hover:text-white transition-colors";
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Form Submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    document.getElementById('admin-product-form').addEventListener('submit', handleCreateProduct);

    // Logout actions
    document.getElementById('logout-trigger').addEventListener('click', handleLogout);
    document.getElementById('profile-logout-btn').addEventListener('click', handleLogout);

    // Navigation Profile trigger
    document.getElementById('nav-profile').addEventListener('click', () => {
        switchView('profile');
    });

    // Proceed to Checkout button
    document.getElementById('proceed-checkout-btn').addEventListener('click', () => {
        if (!state.token) {
            showToast('Please sign in to place an order.', 'warning');
            toggleCartDrawer(false);
            toggleAuthModal(true);
            return;
        }
        openCheckoutModal();
    });

    // Checkout modal close
    document.getElementById('checkout-modal-close').addEventListener('click', () => {
        toggleCheckoutModal(false);
    });

    // Checkout Form Submit
    document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
}

// 4. View Routing / Switching
function switchView(viewName) {
    state.currentView = viewName;
    const shopView = document.getElementById('shop-view');
    const profileView = document.getElementById('profile-view');

    // Remove active styles from nav links
    document.getElementById('nav-shop').classList.remove('text-white');
    document.getElementById('nav-shop').classList.add('text-brandCyan');
    document.getElementById('nav-profile').classList.remove('text-white');
    document.getElementById('nav-profile').classList.add('text-gray-300');

    if (viewName === 'shop') {
        shopView.classList.remove('hidden');
        profileView.classList.add('hidden');
        document.getElementById('nav-shop').classList.add('text-white');
        document.getElementById('nav-shop').classList.remove('text-brandCyan');
    } else if (viewName === 'profile') {
        if (!state.token) {
            showToast('Please sign in to view your profile.', 'warning');
            toggleAuthModal(true);
            return;
        }
        shopView.classList.add('hidden');
        profileView.classList.remove('hidden');
        document.getElementById('nav-profile').classList.add('text-white');
        document.getElementById('nav-profile').classList.remove('text-gray-300');
        loadOrderHistory();
        populateProfileDetails();
    }
    // Re-verify icon state
    lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToProducts() {
    const el = document.getElementById('catalog-anchor');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initChatbot() {
    const panel = document.getElementById('chatbot-panel');
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    if (!panel || !toggle || !close || !form || !input || !messages) return;

    toggle.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            input.focus();
        }
    });

    close.addEventListener('click', () => panel.classList.add('hidden'));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = input.value.trim();
        if (!message) return;

        appendChatMessage(message, true);
        input.value = '';

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            appendChatMessage(data.reply || 'I can help with products, orders, shipping, and checkout.', false);
        } catch (err) {
            console.error('Chatbot request failed:', err);
            appendChatMessage('I am having trouble reaching the assistant right now. Please try again in a moment.', false);
        }
    });

    function appendChatMessage(text, isUser) {
        const bubble = document.createElement('div');
        bubble.className = `max-w-[85%] rounded-2xl px-3 py-2 text-sm ${isUser ? 'ml-auto bg-brandAccent text-white' : 'bg-darkCardBorder text-gray-200'}`;
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }
}

// 5. Products Catalog Logic
async function loadProducts(searchTerm = '') {
    const grid = document.getElementById('product-grid');
    
    try {
        let url = `${state.apiBase}/products`;
        if (searchTerm) {
            url += `?search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.products)) {
            const demoProducts = getDemoProducts();
            const mergedProducts = [...demoProducts, ...data.products].filter((product, index, list) => {
                const key = product.id ? `id:${product.id}` : `title:${product.title}`;
                return index === list.findIndex(item => {
                    const itemKey = item.id ? `id:${item.id}` : `title:${item.title}`;
                    return itemKey === key;
                });
            });

            state.products = mergedProducts.length > 0 ? mergedProducts : data.products;
            document.getElementById('product-count-badge').textContent = `${state.products.length} Products`;
            sortAndRenderProducts();
            return;
        }

        throw new Error(data.message || 'Invalid product payload');
    } catch (err) {
        console.warn('Using demo products because the API is unavailable:', err);
        state.products = getDemoProducts();
        document.getElementById('product-count-badge').textContent = `${state.products.length} Products`;
        sortAndRenderProducts();
        showToast('Showing demo products because the live API is unavailable on GitHub Pages.', 'info');
    }
}

function sortAndRenderProducts() {
    const sortBy = document.getElementById('sort-select').value;
    let sorted = [...state.products];

    if (sortBy === 'price-asc') {
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'name-asc') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    // 'featured' keeps original API sequence (ID desc)

    renderProductGrid(sorted);
}

function renderProductGrid(productsList) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if (productsList.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <i data-lucide="search-code" class="w-12 h-12 mx-auto mb-3 opacity-30"></i>
                <p>No products match your search query.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    productsList.forEach(product => {
        const isOutOfStock = product.stock <= 0;
        
        const card = document.createElement('div');
        card.className = "bg-gradient-to-br from-sky-100 via-white to-sky-50 border border-sky-200 rounded-2xl p-3 flex flex-col justify-between shadow-sm text-left";
        
        card.innerHTML = `
            <div class="space-y-3">
                <!-- Image Wrapper -->
                <div class="aspect-square relative rounded-lg overflow-hidden bg-sky-50 border border-sky-100">
                    <img src="${product.image_url}" alt="${product.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy">
                    ${isOutOfStock 
                        ? `<span class="absolute top-2 right-2 bg-red-600 text-white text-xxs font-extrabold px-2.5 py-1 rounded-md shadow-md">OUT OF STOCK</span>`
                        : product.stock <= 5 
                            ? `<span class="absolute top-2 right-2 bg-amber-500 text-white text-xxs font-extrabold px-2.5 py-1 rounded-md shadow-md animate-pulse">ONLY ${product.stock} LEFT</span>`
                            : ''
                    }
                </div>

                <!-- Product Text -->
                <div class="space-y-1">
                    <div class="flex items-center gap-1 text-amber-400 text-xs">
                        <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
                        <span class="font-bold">4.8</span>
                        <span class="text-gray-500 text-xxs">(24 reviews)</span>
                    </div>
                    <h3 class="font-bold text-slate-800 text-sm tracking-tight leading-snug">${product.title}</h3>
                    <p class="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">${product.description}</p>
                </div>
            </div>

            <!-- Footer Price / Action -->
            <div class="mt-3 pt-2 border-t border-sky-100 flex items-center justify-between">
                <div>
                    <span class="text-xxs text-slate-500 block uppercase font-bold">Price</span>
                    <span class="text-base font-black text-sky-700">$${Number(product.price).toFixed(2)}</span>
                </div>
                
                <button onclick="addToCart(${product.id})" ${isOutOfStock ? 'disabled' : ''} 
                        class="p-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-lg shadow-md transition-colors flex items-center gap-1">
                    <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                    <span class="text-xs font-bold hidden xl:inline">Add</span>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    lucide.createIcons();
}

// 6. Shopping Cart Operations
function toggleCartDrawer(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');

    if (open) {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('opacity-0', 'pointer-events-none');
    }
}

function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    // Check stock limit in client
    const existing = state.cart.find(item => item.product_id === productId);
    const currentQty = existing ? existing.quantity : 0;

    if (currentQty >= product.stock) {
        showToast(`Sorry, cannot add more of "${product.title}". Stock limit reached.`, 'warning');
        return;
    }

    if (existing) {
        existing.quantity += 1;
    } else {
        state.cart.push({
            product_id: product.id,
            title: product.title,
            price: Number(product.price),
            image_url: product.image_url,
            quantity: 1,
            max_stock: product.stock
        });
    }

    // Save cart
    localStorage.setItem('apex_cart', JSON.stringify(state.cart));
    window.dispatchEvent(new CustomEvent('apex:cart-updated', { detail: state.cart }));
    
    // Update visuals
    renderCart();
    showToast(`"${product.title}" added to cart!`, 'success');
}

function updateCartQuantity(productId, delta) {
    const item = state.cart.find(i => i.product_id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;

    if (newQty > item.max_stock) {
        showToast(`Cannot add more. Only ${item.max_stock} items in stock.`, 'warning');
        return;
    }

    if (newQty <= 0) {
        // Remove item
        state.cart = state.cart.filter(i => i.product_id !== productId);
        showToast(`Item removed from cart.`, 'info');
    } else {
        item.quantity = newQty;
    }

    localStorage.setItem('apex_cart', JSON.stringify(state.cart));
    window.dispatchEvent(new CustomEvent('apex:cart-updated', { detail: state.cart }));
    renderCart();
}

function renderCart() {
    const cartCountEl = document.getElementById('cart-count');
    const itemsContainer = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('proceed-checkout-btn');

    // Compute total quantity and amount
    let totalItems = 0;
    let totalPrice = 0;

    state.cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    // Update cart badge
    if (totalItems > 0) {
        cartCountEl.textContent = totalItems;
        cartCountEl.classList.remove('scale-0');
        cartCountEl.classList.add('scale-100');
        checkoutBtn.removeAttribute('disabled');
    } else {
        cartCountEl.classList.remove('scale-100');
        cartCountEl.classList.add('scale-0');
        checkoutBtn.setAttribute('disabled', 'true');
    }

    // Update prices
    subtotalEl.textContent = `$${totalPrice.toFixed(2)}`;
    totalEl.textContent = `$${totalPrice.toFixed(2)}`;

    // Render items list
    itemsContainer.innerHTML = '';
    if (state.cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="text-center py-16 text-gray-500">
                <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto mb-3 opacity-30"></i>
                <p>Your cart is empty.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    state.cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = "flex gap-3 bg-darkBg/60 border border-darkCardBorder rounded-xl p-3";
        itemEl.innerHTML = `
            <!-- Product image -->
            <img src="${item.image_url}" alt="${item.title}" class="w-16 h-16 object-cover rounded-lg border border-darkCardBorder/40">
            
            <!-- Details -->
            <div class="flex-1 flex flex-col justify-between">
                <div class="flex justify-between items-start">
                    <h4 class="text-sm font-semibold text-white line-clamp-1">${item.title}</h4>
                    <span class="text-sm font-bold text-brandCyan ml-2">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                
                <div class="flex justify-between items-center text-xs mt-1">
                    <span class="text-gray-500 font-medium">$${item.price.toFixed(2)} each</span>
                    
                    <!-- Qty adjuster -->
                    <div class="flex items-center gap-2 border border-darkCardBorder/80 rounded-lg p-0.5 bg-darkCard">
                        <button onclick="updateCartQuantity(${item.product_id}, -1)" class="w-6 h-6 hover:bg-darkCardBorder hover:text-white rounded flex items-center justify-center transition-colors">
                            <i data-lucide="minus" class="w-3.5 h-3.5"></i>
                        </button>
                        <span class="w-5 text-center font-bold text-gray-200">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.product_id}, 1)" class="w-6 h-6 hover:bg-darkCardBorder hover:text-white rounded flex items-center justify-center transition-colors">
                            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemEl);
    });

    lucide.createIcons();
}

// 7. Checkout Operations
function toggleCheckoutModal(open) {
    const modal = document.getElementById('checkout-modal');
    if (open) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

function openCheckoutModal() {
    toggleCartDrawer(false);
    toggleCheckoutModal(true);

    const summaryContainer = document.getElementById('checkout-items-summary');
    const totalEl = document.getElementById('checkout-total');

    summaryContainer.innerHTML = '';
    let totalPrice = 0;

    state.cart.forEach(item => {
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;

        const row = document.createElement('div');
        row.className = "flex justify-between items-center py-2.5 text-sm text-gray-300";
        row.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="font-bold text-brandCyan text-xs w-5 h-5 rounded bg-darkCardBorder flex items-center justify-center">${item.quantity}x</span>
                <span class="font-medium line-clamp-1">${item.title}</span>
            </div>
            <span class="font-semibold text-white">$${itemPrice.toFixed(2)}</span>
        `;
        summaryContainer.appendChild(row);
    });

    totalEl.textContent = `$${totalPrice.toFixed(2)}`;
}

async function handleCheckout(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-order-btn');
    const address = document.getElementById('shipping-address').value;
    const city = document.getElementById('shipping-city').value;
    
    // Select checked radio button
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

    if (!address || !city) {
        showToast('Please complete shipping details.', 'error');
        return;
    }

    const payload = {
        items: state.cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity
        })),
        payment_method: paymentMethod,
        shipping_address: `${address}, ${city}` // Simulated addition
    };

    // UI Loading state
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i><span>Processing Secure Order...</span>`;
    lucide.createIcons();

    try {
        const response = await fetch(`${state.apiBase}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.success) {
            showToast('Order placed successfully! Thank you for shopping.', 'success');
            
            // Clear cart
            state.cart = [];
            localStorage.removeItem('apex_cart');
            renderCart();
            
            // Close modal
            toggleCheckoutModal(false);
            
            // If in profile view, reload order list. Else reload shop catalog to show updated stock.
            if (state.currentView === 'profile') {
                await loadOrderHistory();
            } else {
                await loadProducts();
            }
        } else {
            showToast(data.message || 'Checkout failed.', 'error');
        }
    } catch (err) {
        console.error('Checkout error:', err);
        showToast('Network error during checkout.', 'error');
    } finally {
        submitBtn.removeAttribute('disabled');
        submitBtn.innerHTML = `<i data-lucide="shield-check" class="w-5 h-5"></i><span>Authorize Payment &amp; Place Order</span>`;
        lucide.createIcons();
    }
}

// 8. User Auth (Login/Register) Operations
function toggleAuthModal(open) {
    const modal = document.getElementById('auth-modal');
    if (open) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${state.apiBase}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            state.token = data.token;
            state.user = data.user;

            localStorage.setItem('apex_token', data.token);
            localStorage.setItem('apex_user', JSON.stringify(data.user));

            showToast(`Welcome back, ${data.user.name}!`, 'success');
            
            updateAuthNavUI();
            toggleAuthModal(false);

            // Clear login form fields
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            
            // Refresh view
            if (state.currentView === 'profile') {
                populateProfileDetails();
                loadOrderHistory();
            }
        } else {
            showToast(data.message || 'Login failed.', 'error');
        }
    } catch (err) {
        console.error('Login request error:', err);
        showToast('Unable to connect for login.', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${state.apiBase}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.success) {
            showToast('Account registered successfully! You can now log in.', 'success');
            
            // Reset fields
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';

            // Switch to Login tab automatically
            document.getElementById('tab-login').click();
        } else {
            showToast(data.message || 'Registration failed.', 'error');
        }
    } catch (err) {
        console.error('Registration request error:', err);
        showToast('Unable to connect for registration.', 'error');
    }
}

function handleLogout() {
    state.token = null;
    state.user = null;
    localStorage.removeItem('apex_token');
    localStorage.removeItem('apex_user');
    
    showToast('Logged out successfully.', 'info');
    
    updateAuthNavUI();
    
    // Fallback to Shop Catalog view
    switchView('shop');
}

function updateAuthNavUI() {
    const authTrigger = document.getElementById('auth-trigger');
    const logoutTrigger = document.getElementById('logout-trigger');
    const profileBtn = document.getElementById('nav-profile');
    const userNameEl = document.getElementById('user-nav-name');

    if (state.token && state.user) {
        authTrigger.classList.add('hidden');
        logoutTrigger.classList.remove('hidden');
        profileBtn.classList.remove('hidden');
        userNameEl.textContent = state.user.name.split(' ')[0]; // Show first name
    } else {
        authTrigger.classList.remove('hidden');
        logoutTrigger.classList.add('hidden');
        profileBtn.classList.add('hidden');
    }
}

// 9. Profile & History view population
async function handleCreateProduct(e) {
    e.preventDefault();

    const payload = {
        title: document.getElementById('admin-product-title').value.trim(),
        description: document.getElementById('admin-product-description').value.trim(),
        price: document.getElementById('admin-product-price').value,
        stock: document.getElementById('admin-product-stock').value,
        image_url: document.getElementById('admin-product-image').value.trim()
    };

    try {
        const response = await fetch(`${state.apiBase}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (data.success) {
            showToast('Product created successfully.', 'success');
            document.getElementById('admin-product-form').reset();
            await loadProducts();
            await loadAdminDashboard();
        } else {
            showToast(data.message || 'Could not create product.', 'error');
        }
    } catch (err) {
        console.error('Create product error:', err);
        showToast('Unable to create product right now.', 'error');
    }
}

function populateProfileDetails() {
    if (!state.user) return;

    const adminPanel = document.getElementById('admin-panel');
    if (state.user.role === 'admin') {
        adminPanel.classList.remove('hidden');
        loadAdminDashboard();
    } else {
        adminPanel.classList.add('hidden');
    }

    document.getElementById('user-profile-name').textContent = state.user.name;
    document.getElementById('user-profile-email').textContent = state.user.email;
    
    // Role badge
    const roleBadge = document.getElementById('user-profile-role');
    roleBadge.textContent = state.user.role;
    if (state.user.role === 'admin') {
        roleBadge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-950 text-red-400 border border-red-900";
    } else {
        roleBadge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brandAccent/20 text-brandAccent border border-brandAccent/30";
    }

    // Initials Avatar
    const initials = state.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    document.getElementById('user-avatar-initials').textContent = initials.slice(0, 2);

    // Joined date formatting
    if (state.user.created_at) {
        const date = new Date(state.user.created_at);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('user-profile-joined').textContent = date.toLocaleDateString('en-US', options);
    }
}

async function loadAdminDashboard() {
    try {
        const response = await fetch(`${state.apiBase}/auth/admin-dashboard`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });
        const data = await response.json();

        if (data.success) {
            document.getElementById('admin-order-count').textContent = data.summary.orders;
            document.getElementById('admin-product-count').textContent = data.summary.products;
            document.getElementById('admin-customer-count').textContent = data.summary.customers;
            document.getElementById('admin-total-users').textContent = data.summary.totalUsers;

            renderAdminOrders(data.transactions || []);
        }
    } catch (err) {
        console.error('Admin dashboard error:', err);
    }
}

function renderAdminOrders(transactions) {
    const ordersList = document.getElementById('admin-orders-list');
    const transactionsList = document.getElementById('admin-transactions-list');

    if (!ordersList || !transactionsList) return;

    if (!transactions.length) {
        ordersList.innerHTML = '<p class="text-sm text-gray-500">No orders yet.</p>';
        transactionsList.innerHTML = '<p class="text-sm text-gray-500">No transaction history yet.</p>';
        return;
    }

    ordersList.innerHTML = transactions.map(item => `
        <div class="rounded-lg border border-darkCardBorder bg-darkBg/70 p-3">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <p class="font-semibold text-white">${item.customer_name || 'Unknown customer'}</p>
                    <p class="text-sm text-gray-400">${item.customer_email || 'No email'}</p>
                </div>
                <span class="rounded-full bg-brandAccent/15 px-2.5 py-1 text-xs font-semibold text-brandAccent">#${item.order_id}</span>
            </div>
            <div class="mt-2 flex items-center justify-between text-sm text-gray-400">
                <span>${item.status}</span>
                <span>$${Number(item.total_amount).toFixed(2)}</span>
            </div>
            <div class="mt-1 text-xs text-gray-500">${item.payment_method || 'N/A'} • ${new Date(item.created_at).toLocaleString()}</div>
        </div>
    `).join('');

    transactionsList.innerHTML = transactions.map(item => `
        <div class="rounded-lg border border-darkCardBorder bg-darkBg/70 p-3">
            <div class="flex items-center justify-between gap-3">
                <div>
                    <p class="font-semibold text-white">${item.customer_name || 'Unknown customer'}</p>
                    <p class="text-xs text-gray-500">${new Date(item.created_at).toLocaleString()}</p>
                </div>
                <span class="text-sm font-semibold text-brandCyan">$${Number(item.total_amount).toFixed(2)}</span>
            </div>
            <div class="mt-2 text-xs text-gray-400">${item.payment_method || 'N/A'} • ${item.status}</div>
        </div>
    `).join('');
}

async function loadOrderHistory() {
    const historyContainer = document.getElementById('order-history-list');
    
    try {
        const response = await fetch(`${state.apiBase}/orders/user`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });

        const data = await response.json();

        if (data.success) {
            const orders = data.orders;
            document.getElementById('user-profile-orders-count').textContent = `${orders.length} Order${orders.length !== 1 ? 's' : ''}`;
            
            renderOrdersList(orders);
        } else {
            historyContainer.innerHTML = `<div class="text-center py-6 text-red-400">Failed to load order history.</div>`;
        }
    } catch (err) {
        console.error('Error fetching orders:', err);
        historyContainer.innerHTML = `<div class="text-center py-6 text-red-400">Error loading orders.</div>`;
    }
}

function renderOrdersList(orders) {
    const historyContainer = document.getElementById('order-history-list');
    historyContainer.innerHTML = '';

    if (orders.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
                <p>No orders placed yet. Start shopping!</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    orders.forEach(order => {
        const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const statusClass = order.status === 'completed' 
            ? 'bg-green-950/40 text-green-400 border-green-900/60' 
            : order.status === 'pending'
                ? 'bg-amber-950/40 text-amber-400 border-amber-900/60'
                : 'bg-red-950/40 text-red-400 border-red-900/60';

        const orderCard = document.createElement('div');
        orderCard.className = "border border-darkCardBorder bg-darkBg/30 rounded-xl overflow-hidden transition-all duration-300";
        
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div class="flex items-center justify-between py-2 border-b border-darkCardBorder/30 last:border-0 last:pb-0">
                    <div class="flex items-center gap-2">
                        <img src="${item.image_url}" alt="${item.product_title}" class="w-10 h-10 object-cover rounded border border-darkCardBorder/30">
                        <div>
                            <p class="text-sm font-medium text-white line-clamp-1">${item.product_title}</p>
                            <p class="text-xxs text-gray-500">${item.quantity} x $${Number(item.unit_price).toFixed(2)}</p>
                        </div>
                    </div>
                    <span class="text-sm font-semibold text-gray-300">$${(Number(item.unit_price) * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });

        orderCard.innerHTML = `
            <!-- Accordion Header -->
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left hover:bg-darkCardBorder/10 transition-colors">
                <div class="space-y-1">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-white">Order #${order.id}</span>
                        <span class="px-2 py-0.5 text-xxs font-bold border rounded-full ${statusClass}">${order.status}</span>
                    </div>
                    <p class="text-xs text-gray-500">${formattedDate}</p>
                </div>
                <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div class="text-left sm:text-right">
                        <span class="text-xxs text-gray-500 block">Total Paid</span>
                        <span class="text-base font-black text-brandCyan">$${Number(order.total_amount).toFixed(2)}</span>
                    </div>
                    <div class="p-1.5 rounded-lg border border-darkCardBorder bg-darkCard text-gray-400">
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </div>
                </div>
            </button>

            <!-- Accordion Body -->
            <div class="hidden border-t border-darkCardBorder/40 bg-darkBg/60 p-4 space-y-4">
                <div class="space-y-3">
                    <h4 class="text-xxs font-bold text-brandAccent uppercase tracking-wider border-b border-darkCardBorder/30 pb-1.5">Purchased Items</h4>
                    <div class="space-y-2">
                        ${itemsHtml}
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-t border-darkCardBorder/30 pt-3 text-xs text-gray-500">
                    <p>Method: <span class="font-semibold text-gray-300">${order.payment_method}</span></p>
                    <p class="text-green-500 font-semibold flex items-center gap-1">
                        <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                        <span>Transaction Cleared &amp; Shipped</span>
                    </p>
                </div>
            </div>
        `;
        
        historyContainer.appendChild(orderCard);
    });

    lucide.createIcons();
}

// 10. Floating Toast Notifications Utility
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    
    let bgClass = 'bg-green-950/90 text-green-300 border-green-800/80';
    let icon = 'check-circle';

    if (type === 'error') {
        bgClass = 'bg-red-950/90 text-red-300 border-red-800/80';
        icon = 'alert-triangle';
    } else if (type === 'warning') {
        bgClass = 'bg-amber-950/90 text-amber-300 border-amber-800/80';
        icon = 'alert-circle';
    } else if (type === 'info') {
        bgClass = 'bg-indigo-950/90 text-indigo-300 border-indigo-800/80';
        icon = 'info';
    }

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl animate-fade-in ${bgClass}`;
    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i>
        <span class="text-sm font-medium">${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Auto dismiss after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}

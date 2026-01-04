// Product Data
const products = [
    {
        id: 'beni-ourain',
        name: 'Beni Ourain',
        description: 'The classic. Geometric diamonds in cream and charcoal, reminiscent of the High Atlas mountains. This is the cover for people who understand that minimalism doesn\'t mean boring.',
        image: 'images/products/handwoven-beni-ourain.jpg',
        materials: 'Wool blend, hand-knotted',
        origin: 'Atlas Mountains, Morocco',
        color: 'Cream & Charcoal'
    },
    {
        id: 'terracotta-geometric',
        name: 'Terracotta Geometric',
        description: 'Earthy, warm, almost archaeological. Terracotta and saffron geometric patterns that make your living room feel like a carefully curated museum exhibit—except it\'s your home.',
        image: 'images/products/moroccan-style-terracotta.jpg',
        materials: 'Cotton & wool blend, hand-woven',
        origin: 'Fes, Morocco',
        color: 'Terracotta, Saffron, Cream'
    },
    {
        id: 'indigo-kilim',
        name: 'Indigo Kilim',
        description: 'Deep indigo with subtle pattern work. Dyed with traditional indigo that deepens with age. The cover that says: "Yes, I\'m intentional about everything, including how my TV is hidden."',
        image: 'images/products/handwoven-indigo-kilim.jpg',
        materials: 'Cotton & indigo dye',
        origin: 'Marrakech region',
        color: 'Deep Indigo'
    },
    {
        id: 'saffron-nomadic',
        name: 'Saffron Nomadic',
        description: 'Inspired by nomadic Berber tribes. Saffron, rust, and cream in patterns that tell stories of desert journeys. For people who feel like they\'re traveling through their own home.',
        image: 'images/products/berber-tribal-textile.jpg',
        materials: 'Wool & cotton blend',
        origin: 'Saharan edge, Morocco',
        color: 'Saffron, Rust, Cream'
    }
];

const prices = {
    '65': 247,
    '75': 347,
    '85': 447
};

// Cart Management
let cart = JSON.parse(localStorage.getItem('haven-cart')) || [];

// Update cart count in navbar
function updateCartCount() {
    const counts = document.querySelectorAll('.cart-count');
    counts.forEach(el => {
        el.textContent = cart.length;
    });
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('haven-cart', JSON.stringify(cart));
    updateCartCount();
}

// Add to cart
function addToCart(productId, size, price) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = {
        id: `${productId}-${size}`,
        productId,
        name: product.name,
        size,
        price
    };

    cart.push(cartItem);
    saveCart();
    
    // Show feedback
    const btn = document.getElementById('addToCartBtn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Added to Cart';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

// Remove from cart
function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    saveCart();
    renderCart();
}

// Render products grid (homepage)
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="goToProduct('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 80)}...</p>
                <div class="product-price">From $247</div>
                <div class="product-sizes">65" • 75" • 85"</div>
            </div>
        </div>
    `).join('');
}

// Navigate to product page
function goToProduct(productId) {
    localStorage.setItem('haven-current-product', productId);
    window.location.href = 'product.html';
}

// Render product detail page
function renderProductDetail() {
    const productId = localStorage.getItem('haven-current-product');
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    // Update page content
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productMaterials').textContent = product.materials;
    document.getElementById('productOrigin').textContent = product.origin;
    document.getElementById('productImage').innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
    `;

    // Render related products
    renderRelatedProducts(productId);

    // Handle size selection
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const size = btn.dataset.size;
            const price = btn.dataset.price;
            document.querySelector('.selected-price').textContent = `$${price}`;
            
            const addBtn = document.getElementById('addToCartBtn');
            addBtn.disabled = false;
            addBtn.onclick = () => addToCart(productId, size, parseInt(price));
        });
    });
}

// Render related products
function renderRelatedProducts(currentProductId) {
    const related = products.filter(p => p.id !== currentProductId);
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    container.innerHTML = related.map(product => `
        <div class="product-card" onclick="goToProduct('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">From $247</div>
            </div>
        </div>
    `).join('');
}

// Render shopping cart
function renderCart() {
    const emptyCart = document.getElementById('cartEmpty');
    const filledCart = document.getElementById('cartFilled');

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (filledCart) filledCart.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (filledCart) filledCart.style.display = 'grid';

    // Render items
    const itemsList = document.getElementById('cartItemsList');
    if (itemsList) {
        itemsList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}"</p>
                </div>
                <div style="flex: 1; text-align: right;">
                    <div class="cart-item-price">$${item.price}</div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal; // Free shipping

    if (document.getElementById('subtotalPrice')) {
        document.getElementById('subtotalPrice').textContent = `$${subtotal.toFixed(2)}`;
    }
    if (document.getElementById('totalPrice')) {
        document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
    }

    // Setup checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.onclick = initiateCheckout;
    }
}

// Stripe Checkout
async function initiateCheckout() {
    if (cart.length === 0) return;

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart })
        });

        const data = await response.json();
        
        if (data.sessionId) {
            // Redirect to Stripe Checkout
            window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
        } else if (data.error) {
            alert('Checkout error: ' + data.error);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Unable to process checkout. Please try again.');
    }
}

// Handle checkout success (when redirected back from Stripe)
function handleCheckoutSuccess() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
        cart = [];
        saveCart();
        document.getElementById('orderId').textContent = `HAVEN-${Date.now()}`;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderProducts();
    renderProductDetail();
    renderCart();
    handleCheckoutSuccess();
});

// Cart State
let cart = [];

// DOM Elements
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartBtn = document.getElementById('cartBtn');
const cartItems = document.getElementById('cartItems');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize Cart
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    // Render cart items immediately if we are on the cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
    }
    setupCartListeners();
});

function setupCartListeners() {
    // If we are NOT on the cart page, make header cart button redirect to cart.html
    if (cartBtn) {
        cartBtn.onclick = () => {
            window.location.href = 'cart.html';
        };
    }
}

// Cart Functions
function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    showToast(`${product.name} added to cart!`, 'success');
    console.log('[v0] Added to cart:', product.name, 'qty:', quantity);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCartItems();
    showToast('Item removed from cart', 'success');
    console.log('[v0] Removed from cart:', productId);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
        console.log('[v0] Cart loaded from localStorage');
    }
}

function updateCartCount() {
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// function openCartModal() {
//     renderCartItems();
//     openModal(cartModal);
// }

function renderCartItems() {
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🛒</div><p>Your cart is empty</p></div>';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;
    cartItems.innerHTML = '';

    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji || '🌸'}</div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                <div class="cart-item-price" style="font-weight: bold; color: var(--primary);">Total: $${itemTotal.toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
        `;
        cartItems.appendChild(cartItem);
    });

    const delivery = cart.length > 0 ? 9.99 : 0;
    const total = subtotal + delivery;

    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('delivery');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (deliveryEl) deliveryEl.textContent = `$${delivery.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// Modal Utils are inherited from app.js or should be shared.
// Since app.js is loaded after cart.js, we rely on hoisting or function availability at execution time.
// Note: openModal/closeModal in app.js are function declarations so they populate window.


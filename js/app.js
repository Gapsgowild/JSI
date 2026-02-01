// Global State
// Cart is now managed in cart.js
let currentUser = null;
let products = [];
let currentProduct = null;

// Firebase imports
const firebase = window.firebase; // Assuming firebase is available globally
const auth = firebase.auth();
const db = firebase.firestore();

// Modal References
const checkoutModal = document.getElementById('checkoutModal');
const productModal = document.getElementById('productModal');
const authModal = document.getElementById('authModal'); // Declare authModal

const closeCheckoutModal = document.getElementById('closeCheckoutModal');
const closeProductModal = document.getElementById('closeProductModal');
const closeAuthModal = document.getElementById('closeAuthModal'); // Declare closeAuthModal

// Button References
const authBtn = document.getElementById('authBtn');
// checkoutBtn is declared in cart.js
const addToCartBtn = document.getElementById('addToCartBtn');
const checkoutForm = document.getElementById('checkoutForm');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('[v0] Initializing app');
    setupEventListeners();
    loadProducts();
    checkAuthStatus();
});

// Event Listeners Setup
function setupEventListeners() {
    // Checkout
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
    if (closeCheckoutModal) closeCheckoutModal.addEventListener('click', () => closeModal(checkoutModal));

    // Product Modal
    if (closeProductModal) closeProductModal.addEventListener('click', () => closeModal(productModal));

    // Checkout Form
    if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);

    // Quantity Selector
    const decreaseQtyBtn = document.getElementById('decreaseQty');
    const increaseQtyBtn = document.getElementById('increaseQty');
    if (decreaseQtyBtn) decreaseQtyBtn.addEventListener('click', decreaseQuantity);
    if (increaseQtyBtn) increaseQtyBtn.addEventListener('click', increaseQuantity);

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === checkoutModal) closeModal(checkoutModal);
        if (e.target === productModal) closeModal(productModal);
    });
}

// Auth Functions
function checkAuthStatus() {
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateAuthButton();
        console.log('[v0] Auth status checked:', user ? user.email : 'No user');
    });
}

function updateAuthButton() {
    const userEmailElement = document.getElementById('userEmail');

    if (currentUser) {
        authBtn.textContent = `Logout`;
        authBtn.href = '#';
        authBtn.onclick = (e) => {
            e.preventDefault();
            logout();
        };
        if (userEmailElement) userEmailElement.textContent = currentUser.email;
    } else {
        authBtn.textContent = 'Login';
        authBtn.href = 'login.html';
        authBtn.onclick = null;
        if (userEmailElement) userEmailElement.textContent = '';
    }
}

async function logout() {
    try {
        await auth.signOut();
        showToast('Logged out successfully!', 'success');
        console.log('[v0] User logged out');
    } catch (error) {
        showToast('Logout failed', 'error');
        console.log('[v0] Logout error:', error);
    }
}

// Product Functions
async function loadProducts() {
    try {
        console.log('[v0] Loading products from Firestore');

        // Try to get products from Firestore
        const snapshot = await db.collection('products').get();

        if (snapshot.empty) {
            console.log('[v0] No products in Firestore, using sample data');
            // Use sample products if collection is empty
            loadSampleProducts();
        } else {
            products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log('[v0] Loaded', products.length, 'products');
            renderProducts();
        }
    } catch (error) {
        console.log('[v0] Error loading products:', error);
        // Load sample products on error
        loadSampleProducts();
    }
}

function loadSampleProducts() {
    const sampleProducts = [
        {
            id: '1',
            name: 'Red Rose Bouquet',
            price: 49.99,
            description: 'A stunning collection of 12 fresh red roses with greenery',
            emoji: '🌹',
            rating: 4.8
        },
        {
            id: '2',
            name: 'Sunflower Dreams',
            price: 39.99,
            description: 'Bright and cheerful sunflowers arranged beautifully',
            emoji: '🌻',
            rating: 4.9
        },
        {
            id: '3',
            name: 'Tulip Garden',
            price: 44.99,
            description: 'Colorful assorted tulips perfect for spring celebrations',
            emoji: '🌷',
            rating: 4.7
        },
        {
            id: '4',
            name: 'Lavender Dreams',
            price: 54.99,
            description: 'Calming lavender flowers with eucalyptus and baby\'s breath',
            emoji: '💜',
            rating: 4.6
        },
        {
            id: '5',
            name: 'Cherry Blossom Mix',
            price: 59.99,
            description: 'Delicate cherry blossoms with white roses and lilies',
            emoji: '🌸',
            rating: 5.0
        },
        {
            id: '6',
            name: 'Tropical Paradise',
            price: 64.99,
            description: 'Exotic tropical flowers including orchids and birds of paradise',
            emoji: '🌺',
            rating: 4.8
        }
    ];

    products = sampleProducts;
    renderProducts();
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji || '🌸'}</div>
            <div class="product-body">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary btn-small" onclick="openProductDetail('${product.id}')">
                        View Details
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function openProductDetail(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    // Updated to handle both emoji (text) and potential image URLs if added later
    const productImageElement = document.getElementById('productImage');
    productImageElement.textContent = currentProduct.emoji || '🌸';
    // If we were supporting real images, we would check for image URL and set background-image or innerHTML img

    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('productPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
    document.getElementById('quantity').value = 1;

    openModal(productModal);
    console.log('[v0] Opened product detail:', currentProduct.name);
}

function increaseQuantity() {
    const qty = document.getElementById('quantity');
    qty.value = parseInt(qty.value) + 1;
}

function decreaseQuantity() {
    const qty = document.getElementById('quantity');
    if (parseInt(qty.value) > 1) {
        qty.value = parseInt(qty.value) - 1;
    }
}

function handleAddToCart() {
    if (!currentProduct) return;

    const quantity = parseInt(document.getElementById('quantity').value);
    addToCart(currentProduct, quantity);
    closeModal(productModal);
}

addToCartBtn.addEventListener('click', handleAddToCart);

// Cart functions have been moved to cart.js


// Checkout Functions
function openCheckoutModal() {
    if (!currentUser) {
        showToast('Please login to checkout', 'error');
        window.location.href = 'login.html';
        return;
    }

    // Pre-fill email
    document.getElementById('email').value = currentUser.email;
    openModal(checkoutModal);
    closeModal(cartModal);
}

async function handleCheckout(e) {
    e.preventDefault();

    if (!currentUser) {
        showToast('Please login first', 'error');
        return;
    }

    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const deliveryDate = document.getElementById('deliveryDate').value;
    const instructions = document.getElementById('instructions').value;

    if (!fullName || !address || !city || !state || !zip || !deliveryDate) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        console.log('[v0] Creating order');

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = 9.99;
        const total = subtotal + delivery;

        const order = {
            userId: currentUser.uid,
            email: email,
            fullName: fullName,
            address: address,
            city: city,
            state: state,
            zip: zip,
            deliveryDate: deliveryDate,
            instructions: instructions,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            subtotal: subtotal,
            delivery: delivery,
            total: total,
            createdAt: new Date(),
            status: 'pending'
        };

        const docRef = await db.collection('orders').add(order);
        console.log('[v0] Order created with ID:', docRef.id);

        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();

        // Show success message
        showToast('Order placed successfully! Order ID: ' + docRef.id, 'success');

        // Close modals and reset form
        closeModal(checkoutModal);
        checkoutForm.reset();

        console.log('[v0] Order completed:', docRef.id);
    } catch (error) {
        showToast('Error placing order: ' + error.message, 'error');
        console.log('[v0] Checkout error:', error);
    }
}

// Modal Utils
function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function openAuthModal() {
    openModal(authModal);
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

console.log('[v0] App initialized');

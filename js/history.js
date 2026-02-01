// Firebase references
const firebase = window.firebase;
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const ordersContainer = document.getElementById('ordersContainer');
const authBtn = document.getElementById('authBtn');
const userEmailElement = document.getElementById('userEmail');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndLoadHistory();
});

function checkAuthAndLoadHistory() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            updateAuthUI(user);
            loadOrders(user.uid);
        } else {
            // If not logged in, redirect to login or show message
            window.location.href = 'login.html';
        }
    });
}

function updateAuthUI(user) {
    if (user) {
        authBtn.textContent = 'Logout';
        authBtn.href = '#';
        authBtn.onclick = (e) => {
            e.preventDefault();
            auth.signOut().then(() => {
                window.location.href = 'login.html';
            });
        };
        if (userEmailElement) userEmailElement.textContent = user.email;
    }
}

async function loadOrders(userId) {
    try {
        console.log('[v0] Fetching orders for user:', userId);

        const snapshot = await db.collection('orders')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        if (snapshot.empty) {
            ordersContainer.innerHTML = '<div class="no-orders">You haven\'t placed any orders yet.</div>';
            return;
        }

        ordersContainer.innerHTML = '';

        snapshot.forEach(doc => {
            const order = doc.data();
            const date = order.createdAt && order.createdAt.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A';
            const statusClass = order.status === 'completed' ? 'status-completed' : 'status-pending';

            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';

            let itemsHtml = '';
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    itemsHtml += `
                        <div class="order-item">
                            <span>${item.name} (x${item.quantity})</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `;
                });
            }

            orderCard.innerHTML = `
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${doc.id.slice(0, 8).toUpperCase()}</div>
                        <div class="order-date">Placed on ${date}</div>
                    </div>
                    <span class="order-status ${statusClass}">${order.status || 'Pending'}</span>
                </div>
                <div class="order-items">
                    ${itemsHtml}
                </div>
                <div class="order-total">
                    Total: $${order.total ? order.total.toFixed(2) : '0.00'}
                </div>
            `;

            ordersContainer.appendChild(orderCard);
        });

    } catch (error) {
        console.error('[v0] Error loading orders:', error);
        ordersContainer.innerHTML = '<div class="no-orders" style="color:var(--error)">Error loading your orders. Please try again later.</div>';
    }
}

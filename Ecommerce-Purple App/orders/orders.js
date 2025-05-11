class OrderManager {
    constructor() {
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
        this.statusSteps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
    }

    getOrder(orderId) {
        return this.orders.find(order => order.id == orderId);
    }

    get userOrders() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.orders.filter(order => order.userEmail === currentUser?.email);
    }

    updateOrderStatus(orderId, newStatus) {
        const order = this.getOrder(orderId);
        if(order) {
            order.status = newStatus;
            order.lastUpdated = new Date().toISOString();
            localStorage.setItem('orders', JSON.stringify(this.orders));
        }
    }

    getStatusProgress(status) {
        return this.statusSteps.indexOf(status) + 1;
    }
}

// Initialize order manager
const orderManager = new OrderManager();

// Order History Page
function renderOrderHistory() {
    const ordersList = document.getElementById('ordersList');
    const orders = orderManager.userOrders;
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-card" onclick="viewOrder(${order.id})">
            <div class="order-header">
                <div>
                    <span class="order-id">Order #${order.id}</span>
                    <p class="order-date">${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div class="order-status">
                    <span class="status-badge">${order.status}</span>
                </div>
            </div>
            <div class="order-summary">
                <p>${order.items.length} items</p>
                <p>Total: $${order.total.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Order Tracking Page
function renderOrderTracking() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    const order = orderManager.getOrder(orderId);

    if(!order) {
        window.location.href = '/orders/index.html';
        return;
    }

    // Update order details
    document.getElementById('orderId').textContent = order.id;
    document.getElementById('lastUpdated').textContent = 
        new Date(order.lastUpdated).toLocaleString();
    document.getElementById('statusBadge').textContent = order.status;
    document.getElementById('orderTotal').textContent = 
        `$${order.total.toFixed(2)}`;

    // Update timeline
    const progress = document.getElementById('timelineProgress');
    const activeSteps = orderManager.getStatusProgress(order.status);
    const progressWidth = (activeSteps / orderManager.statusSteps.length) * 100;
    progress.style.width = `${progressWidth}%`;

    document.querySelectorAll('.timeline-step').forEach((step, index) => {
        if(index < activeSteps) {
            step.classList.add('active');
        }
    });

    // Render items
    document.getElementById('itemsList').innerHTML = order.items.map(item => `
        <div class="item-row">
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

// Navigation
function viewOrder(orderId) {
    window.location.href = `tracking.html?orderId=${orderId}`;
}

// Initialize based on page
if(window.location.pathname.includes('index.html')) {
    renderOrderHistory();
}

if(window.location.pathname.includes('tracking.html')) {
    renderOrderTracking();
}
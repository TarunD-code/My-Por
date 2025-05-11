class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('purpleCart')) || [];
        this.products = JSON.parse(localStorage.getItem('products'));
    }

    addItem(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if(!product || product.stock < quantity) {
            throw new Error('Product not available');
        }

        const existingItem = this.cart.find(item => item.id === productId);
        if(existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.updateStock(productId, -quantity);
        this.saveCart();
    }

    removeItem(productId) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        if(itemIndex > -1) {
            const item = this.cart[itemIndex];
            this.updateStock(productId, item.quantity);
            this.cart.splice(itemIndex, 1);
            this.saveCart();
        }
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if(item) {
            const quantityDiff = newQuantity - item.quantity;
            if(this.products.find(p => p.id === productId).stock >= quantityDiff) {
                item.quantity = newQuantity;
                this.updateStock(productId, -quantityDiff);
                this.saveCart();
            }
        }
    }

    updateStock(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if(product) {
            product.stock += quantity;
            localStorage.setItem('products', JSON.stringify(this.products));
        }
    }

    saveCart() {
        localStorage.setItem('purpleCart', JSON.stringify(this.cart));
    }

    get cartTotal() {
        return this.cart.reduce((total, item) => 
            total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }
}

// Initialize cart
const cart = new Cart();

// Cart Page Functionality
function renderCart() {
    const cartList = document.getElementById('cartList');
    const cartCount = document.getElementById('cartCount');
    const subtotal = document.getElementById('subtotal');
    const taxes = document.getElementById('taxes');
    const total = document.getElementById('total');

    cartList.innerHTML = cart.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-price">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    const subtotalValue = cart.cartTotal;
    const taxValue = subtotalValue * 0.07;
    const totalValue = subtotalValue + taxValue + 5;

    cartCount.textContent = cart.cart.length;
    subtotal.textContent = `$${subtotalValue.toFixed(2)}`;
    taxes.textContent = `$${taxValue.toFixed(2)}`;
    total.textContent = `$${totalValue.toFixed(2)}`;
}

function updateQuantity(productId, newQuantity) {
    if(newQuantity > 0) {
        cart.updateQuantity(productId, newQuantity);
    } else {
        cart.removeItem(productId);
    }
    renderCart();
}

function removeItem(productId) {
    cart.removeItem(productId);
    renderCart();
}

// Checkout Page Functionality
function renderCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    checkoutItems.innerHTML = cart.cart.map(item => `
        <div class="checkout-item">
            <div>${item.name} x${item.quantity}</div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    checkoutTotal.textContent = `$${(cart.cartTotal * 1.07 + 5).toFixed(2)}`;
}

document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Process order
    const order = {
        id: Date.now(),
        items: cart.cart,
        total: cart.cartTotal * 1.07 + 5,
        date: new Date().toISOString(),
        status: 'Processing'
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart.clearCart();
    
    // Redirect to confirmation
    window.location.href = `/orders/tracking.html?orderId=${order.id}`;
});

// Initialize based on page
if(window.location.pathname.includes('cart')) {
    renderCart();
}

if(window.location.pathname.includes('checkout')) {
    renderCheckout();
}
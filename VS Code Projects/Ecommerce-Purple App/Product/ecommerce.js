class ProductService {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products')) || this.initProducts();
    }

    initProducts() {
        // Generate sample products
        const products = Array.from({length: 100}, (_, i) => ({
            id: i+1,
            name: `Product ${i+1}`,
            price: (Math.random() * 500 + 50).toFixed(2),
            stock: Math.floor(Math.random() * 50),
            description: `Premium product ${i+1} description`,
            image: `https://picsum.photos/300/200?random=${i}`
        }));
        
        localStorage.setItem('products', JSON.stringify(products));
        return products;
    }

    getProducts() {
        return this.products;
    }
}

// Render products
const productService = new ProductService();
const productGrid = document.querySelector('.product-grid');

productService.getProducts().forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    productGrid.appendChild(card);
});

function addToCart(productId) {
    // Cart functionality
}
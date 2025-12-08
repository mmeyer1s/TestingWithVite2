import './style.css'

const app = document.querySelector('#app')

const products = [
  {
    id: 1,
    name: 'Midnight Rave',
    description: 'Intense 90% dark chocolate with espresso beans',
    price: 6.99,
    image: '🍫'
  },
  {
    id: 2,
    name: 'Velvet Storm',
    description: 'Smooth milk chocolate with caramel and sea salt',
    price: 5.99,
    image: '🍫'
  },
  {
    id: 3,
    name: 'Crystal Cocoa',
    description: 'White chocolate with edible gold flakes',
    price: 7.49,
    image: '🍫'
  },
  {
    id: 4,
    name: 'Nutty Rave',
    description: 'Dark chocolate with roasted almonds and pistachios',
    price: 6.49,
    image: '🍫'
  },
  {
    id: 5,
    name: 'Mint Rave',
    description: 'Dark chocolate with peppermint and dark cocoa nibs',
    price: 5.99,
    image: '🍫'
  },
  {
    id: 6,
    name: 'Citrus Rave',
    description: 'Dark chocolate with orange zest and chili flakes',
    price: 6.99,
    image: '🍫'
  }
]

let cart = []

function renderHeader() {
  return `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">🍫</span>
            <span class="logo-text">Cocoa Rave</span>
          </div>
          <nav class="nav-links">
            <a href="/reports.html" class="nav-link">📊 Police Reports</a>
            <button class="cart-btn btn" onclick="toggleCart()">
              <span>🛒</span>
              <span class="cart-count badge bg-dark">${cart.length}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  `
}

function renderHero() {
  return `
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Welcome to Cocoa Rave</h1>
        <p class="hero-subtitle">Premium handcrafted chocolate bars that make you dance</p>
        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <button class="hero-btn btn btn-light btn-lg" onclick="document.getElementById('products').scrollIntoView({behavior: 'smooth'})">
            Shop Now
          </button>
          <a href="/reports.html" class="hero-btn btn btn-lg" style="background-color: var(--accent); text-decoration: none; display: inline-flex; align-items: center;">
            📊 View Police Reports
          </a>
        </div>
      </div>
    </section>
  `
}

function renderProducts() {
  return `
    <section id="products" class="products-section">
      <div class="container">
        <h2 class="section-title">Our Chocolate Collection</h2>
        <div class="row g-4">
          ${products.map(product => `
            <div class="col-md-6 col-lg-4">
              <div class="product-card card h-100">
                <div class="card-body d-flex flex-column">
                  <div class="product-image">${product.image}</div>
                  <h3 class="product-name card-title">${product.name}</h3>
                  <p class="product-description card-text">${product.description}</p>
                  <div class="product-footer mt-auto d-flex justify-content-between align-items-center">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn btn" onclick="addToCart(${product.id})">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

function renderCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  return `
    <div id="cart-overlay" class="cart-overlay" onclick="toggleCart()">
      <div class="cart-panel" onclick="event.stopPropagation()">
        <div class="cart-header">
          <h2 class="mb-0">Your Cart</h2>
          <button type="button" class="btn-close btn-close-white" onclick="toggleCart()" aria-label="Close"></button>
        </div>
        <div class="cart-items">
          ${cart.length === 0 ? '<p class="empty-cart">Your cart is empty</p>' : 
            cart.map((item, index) => `
              <div class="cart-item">
                <span class="cart-item-emoji">${item.image}</span>
                <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="remove-btn btn btn-link" onclick="removeFromCart(${index})">🗑️</button>
              </div>
            `).join('')
          }
        </div>
        ${cart.length > 0 ? `
          <div class="cart-footer">
            <div class="cart-total">
              <span>Total:</span>
              <span class="total-price">$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn btn btn-primary w-100" onclick="checkout()">Checkout</button>
          </div>
        ` : ''}
      </div>
    </div>
  `
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Cocoa Rave. All rights reserved.</p>
        <p>Made with ❤️ and premium cocoa</p>
      </div>
    </footer>
  `
}

function render() {
  app.innerHTML = `
    ${renderHeader()}
    ${renderHero()}
    ${renderProducts()}
    ${renderCart()}
    ${renderFooter()}
  `
}

window.addToCart = function(productId) {
  const product = products.find(p => p.id === productId)
  if (product) {
    cart.push(product)
    render()
    const overlay = document.getElementById('cart-overlay')
    overlay.classList.add('active')
  }
}

window.removeFromCart = function(index) {
  cart.splice(index, 1)
  render()
  const overlay = document.getElementById('cart-overlay')
  overlay.classList.add('active')
}

window.toggleCart = function() {
  const overlay = document.getElementById('cart-overlay')
  overlay.classList.toggle('active')
}

window.checkout = function() {
  alert(`Thank you for your order! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`)
  cart = []
  render()
}

render()


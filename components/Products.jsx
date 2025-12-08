import React, { useState } from 'react'
import { createRipple, addConfetti, playSound } from '../utils/animations'

function Products({ products, onAddToCart }) {
  const [clickedId, setClickedId] = useState(null)

  const handleClick = (e, productId) => {
    createRipple(e)
    playSound('click')
    setClickedId(productId)
    onAddToCart(productId)
    
    // Add confetti effect
    const rect = e.currentTarget.getBoundingClientRect()
    addConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
    
    setTimeout(() => setClickedId(null), 500)
  }

  return (
    <section id="products" className="products-section">
      <div className="container">
        <h2 className="section-title">Our Chocolate Collection</h2>
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <div className="product-card card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="product-image">{product.image}</div>
                  <h3 className="product-name card-title">{product.name}</h3>
                  <p className="product-description card-text">{product.description}</p>
                  <div className="product-footer mt-auto d-flex justify-content-between align-items-center">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button 
                      className={`add-to-cart-btn btn jelly-btn ${clickedId === product.id ? 'clicked' : ''}`}
                      onClick={(e) => handleClick(e, product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products

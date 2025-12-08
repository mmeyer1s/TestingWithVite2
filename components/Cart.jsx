import React, { useState } from 'react'
import { createRipple, addConfetti, playSound } from '../utils/animations'

function Cart({ cart, isOpen, onClose, onRemoveFromCart, onCheckout }) {
  const [checkoutClicked, setCheckoutClicked] = useState(false)
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = (e) => {
    createRipple(e)
    playSound('success')
    setCheckoutClicked(true)
    
    // Add confetti effect
    const rect = e.currentTarget.getBoundingClientRect()
    addConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
    
    setTimeout(() => {
      onCheckout()
      setCheckoutClicked(false)
    }, 500)
  }

  const handleRemove = (e, index) => {
    createRipple(e)
    playSound('click')
    onRemoveFromCart(index)
  }

  if (!isOpen) return null

  return (
    <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="mb-0">Your Cart</h2>
          <button 
            type="button" 
            className="btn-close btn-close-white jelly-btn" 
            onClick={onClose} 
            aria-label="Close"
          ></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <span className="cart-item-emoji">{item.image}</span>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>
                <button 
                  className="remove-btn btn btn-link jelly-btn" 
                  onClick={(e) => handleRemove(e, index)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">${total.toFixed(2)}</span>
            </div>
            <button 
              className={`checkout-btn btn btn-primary w-100 jelly-btn ${checkoutClicked ? 'clicked' : ''}`}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import Cart from './components/Cart'
import Footer from './components/Footer'

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

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      setCart([...cart, product])
      setIsCartOpen(true)
    }
  }

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
    setIsCartOpen(true)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    alert(`Thank you for your order! Total: $${total.toFixed(2)}`)
    setCart([])
    setIsCartOpen(false)
  }

  return (
    <>
      <Header cartCount={cart.length} onToggleCart={toggleCart} />
      <Hero />
      <Products products={products} onAddToCart={addToCart} />
      <Cart 
        cart={cart} 
        isOpen={isCartOpen} 
        onClose={toggleCart}
        onRemoveFromCart={removeFromCart}
        onCheckout={checkout}
      />
      <Footer />
    </>
  )
}

export default App


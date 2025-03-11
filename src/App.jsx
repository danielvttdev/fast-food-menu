import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Menu from './pages/Menu'
import Admin from './pages/Admin'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'

// Configuración de las future flags de React Router
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}

function App() {
  return (
    <CartProvider>
      <Router {...router}>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Cart />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App

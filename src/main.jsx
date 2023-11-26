import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css'
import { AuthProvider } from './components/context/UserContext.jsx'
import { CartProvider } from './components/context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <CartProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CartProvider>
  </AuthProvider>
)

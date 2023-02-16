import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {AuthProvider} from './context/AuthProvider'

if (process.env.NODE_ENV === 'development') {
  const {worker} = require('./mocks/browser')

  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {AuthProvider} from './context/AuthProvider'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

if (process.env.NODE_ENV === 'development') {
  const {worker} = require('./mocks/browser')

  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)

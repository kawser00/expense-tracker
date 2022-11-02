import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <div className="header">
        <h1 onClick={() => navigate('/')} className="cursor-pointer">Expense Tracker</h1>
      </div>

      <div className="main">
        <div className="container">
          {children}
        </div>
      </div>

      <div className="footer">&copy;{currentYear} Kawser Ahmed</div>
    </div>
  )
}

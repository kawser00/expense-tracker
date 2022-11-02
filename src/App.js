import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewTransactions from './pages/ViewTransactions';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/transactions" element={<ViewTransactions />} />
      </Routes>
    </Router>
  );
}

export default App;

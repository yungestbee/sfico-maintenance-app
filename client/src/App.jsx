import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimaryPage from './admin/primaryPage.jsx';
import AdminLoginPage from './admin/adminLogin.jsx';
import './index.css'
import './Yemi.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<PrimaryPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimaryPage from './admin/primaryPage.jsx';
import PrimaryPage2 from './engr/PrimaryPage.jsx';
import AdminLoginPage from './admin/adminLogin.jsx';
import FPPage from './admin/FPPage.jsx';
import './index.css'
import './Yemi.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/admin" element={<PrimaryPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/" element={<PrimaryPage2 />} />
        <Route path="/change-password" element={<FPPage />} />
      </Routes>
    </Router>
  );
}

export default App;

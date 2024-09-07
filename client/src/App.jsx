import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimaryPage from './admin/primaryPage.jsx';
import PrimaryPage2 from './engr/PrimaryPage.jsx';
import AdminLoginPage from './admin/adminLogin.jsx';
import FPPage from './admin/FPPage.jsx';
import './index.css';
import './Yemi.css';
import ForgotPassword from './engr/ForgotPassword.jsx';
import EngrPage from './engr/EngrPage.jsx';
import { AdminContextProvider } from './admin/adminContext.jsx';
import ReportPage from './admin/Reports.jsx';
import MaintenancePage from './engr/MaintenanceLog.jsx';
import AdminEngrPage from './admin/adminEngineerPage.jsx';
import CompanyPage from './admin/adminCompanyPage.jsx';

function App() {
  return (
    <AdminContextProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/admin" element={<PrimaryPage />} />
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/" element={<PrimaryPage2 />} />
          <Route path="/change-password" element={<FPPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reports" element={<EngrPage />} />
          <Route path="/admin/reports" element={<ReportPage />} />
          <Route path="/maintenance-log" element={<MaintenancePage />} />
          <Route path="/admin/engineers" element={<AdminEngrPage />} />
          <Route path="/admin/companies" element={<CompanyPage />} />
        </Routes>
      </Router>
    </AdminContextProvider>
  );
}

export default App;

import { Link, useNavigate } from 'react-router-dom';
import './primaryPage.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AdminLoginPage from './adminLogin';
import { FaUserGear, FaFolderOpen, FaBuilding } from 'react-icons/fa6';
import AdminHeader from './adminHeader';
import {jwtDecode} from 'jwt-decode'; // Ensure this import is correct

function PrimaryPage() {
  const token = Cookies.get('userToken');
  const [decode, setDecode] = useState('');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const user = decoded.user.name.split('.');
      setDecode(user);
    }
  }, [token]);

  return (
    <>
      {decode=='admin' ? (
        <div className="container13">
          <AdminHeader />
          <div className="container1">
            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to="/admin/companies"
            >
              <div className="primaryCard">
                <FaBuilding className="adminIcon" />
                <h3> Manage Companys' Account</h3>
              </div>
            </Link>

            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to="/admin/engineers"
            >
              <div className="primaryCard">
                <FaUserGear className="adminIcon" />
                <h3> Manage Engineers' Account</h3>
              </div>
            </Link>

            <Link
              style={{ textDecoration: 'none', color: '#fff' }}
              to="/admin/reports"
            >
              <div className="primaryCard">
                <FaFolderOpen className="adminIcon" />
                <h3> View Reports </h3>
              </div>
            </Link>
          </div>
          {/* <img className="hero-img margin-top-big" src={logo} alt="logo" /> */}
        </div>
      ) : (
        <AdminLoginPage />
      )}
    </>
  );
}

export default PrimaryPage;

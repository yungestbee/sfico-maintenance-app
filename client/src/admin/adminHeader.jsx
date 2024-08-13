import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminHeader.css";
import { useAdmin } from "./adminContext";
import Cookies from "js-cookie";

function AdminHeader() {
  const token = Cookies.get("foodieToken");
  const { adminInfo, setAdminInfo } = useAdmin();
  const navigate = useNavigate();


  function logout() {
    fetch("http://localhost:2300/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      navigate("/login");
    });
    setAdminInfo(null);
  }
  console.log(adminInfo);
  
  if (adminInfo) {
      const username =
        adminInfo.split(".")
      var Dname = username ? username[0] : null;
    }
  console.log(Dname);
  
  return (
    <div className="Header1">
      <div className="nav-flex-container1">
        <div className="nav-flex-container1-image">
          <img src="/sfico-logo.png" alt="company logo"/>
        </div>
        <div className="nav-btn-box">
          {Dname && (
            <>
              <a className="nav-btn1" onClick={logout}>
                Logout
              </a>
              <span className="nav-btn1 nav-btn-colored1">{Dname}</span>
            </>
          )}
          {!Dname && (
            <>
              <Link className="nav-btn1" to="/login">
                Log-In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;

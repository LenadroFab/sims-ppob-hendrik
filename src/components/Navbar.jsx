import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import logo from "../assets/Logo.png";
import "../styles/navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar-sims">
      <div className="navbar-inner">
        {/* LEFT */}
        <div className="navbar-left">
          <img src={logo} alt="SIMS PPOB" className="navbar-logo" />
          <span className="navbar-title">SIMS PPOB</span>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">
          <NavLink
            to="/topup"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Top Up
          </NavLink>

          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Transaction
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Akun
          </NavLink>

          {/* OPTIONAL: Logout button (aktifkan kalau perlu) */}
          {/*
          <button className="nav-item logout" onClick={handleLogout}>
            Logout
          </button>
          */}
        </div>
      </div>
    </nav>
  );
}

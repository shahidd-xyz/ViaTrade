import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    axios
      .get("https://viatrade.vercel.app/isUser", { withCredentials: true })
      .then((res) => {
        if (isMounted && res.data?.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.log("isUser check failed:", err?.response?.status);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayName = user?.username || "USERID";
  const displayInitials = getInitials(displayName);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleProfileMouseEnter = () => {
    setIsProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://viatrade.onrender.com/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Logout request failed:", err?.response?.status);
    } finally {
      setUser(null);
      setIsProfileDropdownOpen(false);
      navigate("/login");
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="media/images/kite.png" alt="Kite logo" className="dashboard-logo" />
      <Link
        className="mobile-watchlist-shortcut"
        to="/watchlist"
        onClick={() => handleMenuClick(6)}
      >
        Watchlist
      </Link>
      <button
        className={`dashboard-menu-toggle ${isMobileMenuOpen ? "open" : ""}`}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`menus ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div
          className={`profile ${isProfileDropdownOpen ? "dropdown-open" : ""}`}
          onClick={handleProfileClick}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <div className="avatar">{displayInitials}</div>
          <p className="username">{displayName}</p>
          <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
            <div className="profile-dropdown-info">
              <div className="avatar avatar-lg">{displayInitials}</div>
              <div className="profile-dropdown-meta">
                <p className="profile-dropdown-name">{displayName}</p>
                {user?.email && (
                  <p className="profile-dropdown-email">{user.email}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              className="profile-dropdown-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;

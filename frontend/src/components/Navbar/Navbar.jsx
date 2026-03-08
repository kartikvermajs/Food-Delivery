import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { X } from "lucide-react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSearchTrigger = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchTrigger();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  return (
    <>
      <div className={`navbar ${isSearchActive ? "search-active" : ""}`}>
        {!isSearchActive && (
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Mealio .</h1>
          </Link>
        )}
        <ul className="navbar-menu desktop-menu">
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="https://food-delivery-admin-u5bn.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenu("Mobile-App")}
            className={menu === "Mobile-App" ? "active" : ""}
          >
            Admin Panel
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("Contact-Us")}
            className={menu === "Contact-Us" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
        <div className="navbar-right">
          <div className={`search-container ${isSearchActive ? "expanded" : ""}`}>
            <img
              src={assets.search_icon}
              alt="Search"
              onClick={() => {
                if (isSearchActive && searchQuery.trim()) {
                  handleSearchTrigger();
                } else {
                  setIsSearchActive(!isSearchActive);
                }
              }}
              className="search-icon"
            />
            {isSearchActive && (
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <X className="search-close-icon" onClick={clearSearch} size={20} />
              </div>
            )}
          </div>
          {!isSearchActive && (
            <>
              <div className="navbar-search-icon">
                <Link to="/cart">
                  <img src={assets.basket_icon} alt="" />
                </Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
              </div>
              {!token ? (
                <button onClick={() => setShowLogin(true)}>Sign In</button>
              ) : (
                <div className="navbar-profile">
                  <img src={assets.profile_icon} alt="" />
                  <ul className="nav-profile-dropdown">
                    <li onClick={() => navigate('/myorders')}>
                      <img src={assets.bag_icon} alt="" />
                      <p>Orders</p>
                    </li>
                    <hr />
                    <li onClick={logout}>
                      <img src={assets.logout_icon} alt="" />
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mobile-sub-navbar">
        <ul className="navbar-menu mobile-menu">
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="https://food-delivery-admin-u5bn.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenu("Mobile-App")}
            className={menu === "Mobile-App" ? "active" : ""}
          >
            Admin Panel
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("Contact-Us")}
            className={menu === "Contact-Us" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

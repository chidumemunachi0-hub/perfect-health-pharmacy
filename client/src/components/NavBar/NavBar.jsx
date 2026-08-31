import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaBoxOpen,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function NavBar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setShowMenu(false);

    navigate("/login");
  };

  return (
    <header className="navbar">

      {/* LOGO */}
      <div className="logo">
        <h2>Perfect Health</h2>
        <span>Pharmacy & Superstore</span>
      </div>

      {/* SEARCH */}
      <form
        className="search-box"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search medicines, groceries, beauty products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          <FaSearch />
        </button>
      </form>

      <div className="nav-icons">

        {/* USER */}
        {user ? (
          <button
            className="user-profile"
            onClick={() => setShowMenu((prev) => !prev)}
            type="button"
          >
            <span className="user-initial">
              {(
                user.name?.charAt(0) ||
                user.email?.charAt(0) ||
                "U"
              ).toUpperCase()}
            </span>

            <span className="user-name">
              {user.name || "Account"}
            </span>
          </button>
        ) : (
          <Link
            to="/login"
            className="login-btn"
          >
            <FaUserCircle />
            <span>Login</span>
          </Link>
        )}

        {/* CART */}
        <Link
          to="/cart"
          className="cart-btn"
        >
          <FaShoppingCart />

          <span className="cart-count">
            {cart.reduce(
              (total, item) =>
                total + item.quantity,
              0
            )}
          </span>
        </Link>

      </div>

      {/* ACCOUNT MENU */}
      {user && showMenu && (
        <div className="account-dropdown">

          <Link
            to="/my-orders"
            onClick={() => setShowMenu(false)}
          >
            <FaBoxOpen />
            <span>My Orders</span>
          </Link>

          <Link
            to="/profile"
            onClick={() => setShowMenu(false)}
          >
            <FaUser />
            <span>My Profile</span>
          </Link>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </div>
      )}

    </header>
  );
}

export default NavBar;
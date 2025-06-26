import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img
            src="https://cdn-icons-png.freepik.com/256/15018/15018586.png?semt=ais_hybrid"
            alt="ShoppyGlobe Logo"
            style={{
              height: "32px",
              width: "32px",
              marginRight: "10px",
              verticalAlign: "middle",
            }}
          />
          <h1>ShoppyGlobe</h1>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </nav>

        <div className="header-actions">
          <button className="cart-button" onClick={() => navigate("/cart")}>
            <span className="cart-icon">🛒</span>
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

// Main home container
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShoppyGlobe</h1>
          <p>Discover amazing products from around the world</p>
          <p>SUBHA GOLDAR</p>
          <a
            href="https://github.com/Subgold10/ShoppyGlobe-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/Subgold10/ShoppyGlobe-1
          </a>{" "}
          <br />
          <br />
          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20231221/pngtree-creative-big-reward-wallpaper-image_15547212.png"
            alt="Shopping"
          />
        </div>
      </section>

      {}
      <section className="features">
        <div className="features-container">
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free shipping on all orders over $50</p>
          </div>

          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Your payment information is safe with us</p>
          </div>

          <div className="feature">
            <div className="feature-icon">📞</div>
            <h3>24/7 Support</h3>
            <p>Get help whenever you need it</p>
          </div>

          <div className="feature">
            <div className="feature-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy on all items</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

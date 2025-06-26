import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../utils/cartSlice";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
          {product.discountPercentage > 0 && (
            <div className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>

          <div className="product-rating">
            {renderStars(product.rating)}
            <span className="rating-text">({product.rating})</span>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="original-price">
                $
                {Math.round(
                  product.price / (1 - product.discountPercentage / 100)
                )}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;

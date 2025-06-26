// Get product ID and fetch product details
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProduct } from "../hooks/useProducts";
import { addItem } from "../utils/cartSlice";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import "./ProductDetail.css";

const ProductDetail = () => {
  // Handle add to cart and navigation
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, loading, error } = useProduct(id);

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Show loading, error, or not found
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  // Render product detail container
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
    <div className="product-detail">
      {/* Render back button */}
      <button className="back-button" onClick={handleGoBack}>
        ← Back
      </button>

      {/* Render product detail content */}
      <div className="product-detail-content">
        {/* Render product images and gallery */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.thumbnail} alt={product.title} />
            {product.discountPercentage > 0 && (
              <div className="discount-badge">
                -{Math.round(product.discountPercentage)}%
              </div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="image-gallery">
              {product.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="gallery-image"
                />
              ))}
            </div>
          )}
        </div>

        {/* Render product info, rating, price, and description */}
        <div className="product-info">
          <div className="product-header">
            <h1>{product.title}</h1>
            <span className="product-brand">{product.brand}</span>
            <span className="product-category">{product.category}</span>
          </div>

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

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Render product details (stock, weight, dimensions) */}
          <div className="product-details">
            <div className="detail-item">
              <strong>Stock:</strong> {product.stock} available
            </div>
            {product.weight && (
              <div className="detail-item">
                <strong>Weight:</strong> {product.weight}g
              </div>
            )}
            {product.dimensions && (
              <div className="detail-item">
                <strong>Dimensions:</strong> {product.dimensions.width} ×{" "}
                {product.dimensions.height} × {product.dimensions.depth} cm
              </div>
            )}
          </div>

          {/* Render add to cart button */}
          <div className="product-actions">
            <button
              className="add-to-cart-btn primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

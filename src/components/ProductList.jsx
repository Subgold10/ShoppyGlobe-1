// Fetch products and manage search/filter state
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { setFilteredProducts, setSearchTerm } from "../utils/searchSlice";
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import "./ProductList.css";

const ProductList = () => {
  // Show loading or error if needed
  const { products, loading, error } = useProducts();
  const dispatch = useDispatch();
  const { searchTerm, filteredProducts } = useSelector((state) => state.search);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = searchTerm
        ? products.filter(
            (product) =>
              product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              product.category.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : products;

      dispatch(setFilteredProducts(filtered));
    }
  }, [products, searchTerm, dispatch]);

  // Handle search input
  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  // Render product list container and header
  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="product-list-container">
      {/* Render product list header and search bar */}
      <div className="product-list-header">
        <h2>Our Products</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Show search results info if searching */}
      {searchTerm && (
        <div className="search-results">
          <p>
            {displayProducts.length} product
            {displayProducts.length !== 1 ? "s" : ""} found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      )}

      {/* Show no products message or product grid */}
      {displayProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="product-grid">
          {displayProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

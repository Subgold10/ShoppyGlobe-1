import { useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "../utils/cartSlice";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(
      addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.image,
      })
    );
  };

  const handleDecrease = () => {
    dispatch(removeItem(item.id));
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="item-details">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-price">${item.price}</p>
      </div>

      <div className="item-quantity">
        <button className="quantity-btn decrease" onClick={handleDecrease}>
          -
        </button>

        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
          className="quantity-input"
        />

        <button className="quantity-btn increase" onClick={handleIncrease}>
          +
        </button>
      </div>

      <div className="item-total">
        <span className="total-price">${item.totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartItem;

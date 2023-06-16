import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { CartContext } from './CartContext';

function Cart() {
  const { cartItem, setCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = (itemId) => {
    const updatedItems = cartItem.filter((item) => item.id !== itemId);
    setCartItem(updatedItems);
  };

  const handleDecrease = (itemId) => {
    setCartItem((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === itemId && prevItem.quantity > 1
          ? { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem
      )
    );
  };

  const handleIncrease = (itemId) => {
    setCartItem((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === itemId ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
      )
    );
  };

  const totalPrice = cartItem.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItem.map((item) => {
            const { id, title, price, quantity } = item;

            return (
              <tr key={id}>
                <td>{title}</td>
                <td >${price}</td>
                <td>
                  <Button variant="outline-primary" onClick={() => handleDecrease(id)}>-</Button>
                  <span className='mx-4'>{quantity}</span>
                  <Button variant="outline-primary" onClick={() => handleIncrease(id)}>+</Button>
                </td>
                <td>
                  <Button variant="outline-danger" onClick={() => handleRemove(id)}>Remove</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <h3 >Total Price: ${totalPrice}</h3>
        <Button variant="primary" onClick={() => navigate('/checkout')}>Checkout</Button>
      </div>
    </div>
  );
}

export default Cart;

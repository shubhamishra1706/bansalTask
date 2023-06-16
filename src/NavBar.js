import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';
function NavBar() {
  const { cartItem } = useContext(CartContext);
  const navigate = useNavigate();
  const cartItemCount = cartItem.length;


  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://bansaltechprofessionals.com/assets/images/logo/logo.png"
              width="100"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Text style={{ cursor: 'pointer' }}>
            <FaShoppingCart onClick={() => handleCartClick()} size={20} />
            {cartItemCount > 0 && <span className="ml-1">{cartItemCount}</span>}
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

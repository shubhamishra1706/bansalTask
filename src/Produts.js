import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import data from './data.json';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CartContext } from './CartContext';

function Products() {
  const { cartItem, setCartItem } = useContext(CartContext);
  const navigate = useNavigate();
  const ProductData = data.products;

  const handleClick = (item) => {
    const existingItem = cartItem.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItem((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity + 1 }
            : prevItem
        )
      );
    } else {
      setCartItem((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const checkout = () => {
    navigate('/cart');
  };

  useEffect(() => {
    // console.log(cartItem)
  }, [cartItem]);

  return (
    <>
      <div className="container-fluid">
        <div className="row my-2">
          {ProductData.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4 col-xl-3 my-4">
              <Card
                style={{ width: '18rem', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Card.Img
                  variant="top"
                  src={item.images[0]}
                  style={{ height: '110px', width: '100%' }}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text
                    style={{
                      height: '70px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.description}
                  </Card.Text>

                  <div className="d-flex justify-content-between">
                    <div>
                      <del className="text-muted">{item.price}</del>
                    </div>
                    <div className="text-danger">{item.discountPercentage}</div>
                  </div>

                  <Button variant="dark" onClick={() => handleClick(item)}>
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <Button
          variant="success"
          className="floating-button"
          onClick={checkout}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '999',
          }}
        >
          Go to Cart
        </Button>
      </div>
    </>
  );
}

export default Products;

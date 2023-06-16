import React, { useContext, useState } from 'react';
import { Container, Row, Form, Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function Checkout() {
  const { setCartItem } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    payment: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { name, address, payment } = formData;
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (address.trim() === '') {
      errors.address = 'Address is required';
    }

    if (payment.trim() === '') {
      errors.payment = 'Payment details are required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setCartItem([]);
      setFormData({
        name: '',
        address: '',
        payment: '',
      });

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/');
      }, 3000);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <div className="col-5">
          <h2>Checkout</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="payment">
              <Form.Label>Payment Details</Form.Label>
              <Form.Control
                type="text"
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
                isInvalid={!!errors.payment}
              />
              <Form.Control.Feedback type="invalid">{errors.payment}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="dark" type="submit" className='my-4'>
              Submit
            </Button>
          </Form>

          <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Thank you!</strong>
            </Toast.Header>
            <Toast.Body>Your purchase has been successful.</Toast.Body>
          </Toast>
        </div>
      </Row>
    </Container>
  );
}

export default Checkout;

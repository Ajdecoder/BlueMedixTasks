import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: "New Product",
        price: 99.99,
        image: "https://via.placeholder.com/150",
      });
  
      console.log("Added:", response.data); // This will return a mock response
      alert("Product added (mocked)!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

export const AddProduct = () => {
  const [product, setProduct] = useState({ title: "", price: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  return (
    <Container className="mt-4">
      <h2 className="text-center">Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="title" value={product.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" value={product.image} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="success">Add Product</Button>
      </Form>
    </Container>
  );
};


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants"; // Ensure API_URL is correctly imported
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";

const AddUser = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  return (
    <Container className="mt-4">
      <h2 className="text-center">Add User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={user.username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={user.password} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary">Add User</Button>
      </Form>
    </Container>
  );
};

export default AddUser;


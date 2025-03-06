import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Card } from "react-bootstrap";

export const AddProduct = () => {
  const [product, setProduct] = useState({ title: "", price: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", product);
      console.log("Added Product:", response.data);
      alert("Product added successfully (mocked)!");
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Add Product</h2>
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
          <Button type="submit" variant="success" className="w-100">Add Product</Button>
        </Form>
      </Card>
    </Container>
  );
};

export const AddUser = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", user);
      console.log("Added User:", response.data);
      alert("User added successfully (mocked)!");
      navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Add User</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={user.username} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Add User</Button>
        </Form>
      </Card>
    </Container>
  );
};
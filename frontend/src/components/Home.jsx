import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4 animate-bounce">Welcome to Crud-Karo</h1>
      <p className="lead">A simple CRUD application to manage users and products efficiently.</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button as={Link} to="/users" variant="primary">Manage Users</Button>
        <Button as={Link} to="/products" variant="success">Manage Products</Button>
      </div>
    </Container>
  );
};

import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

export const Loading = ({ message = "Loading..." }) => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-3">{message}</p>
    </Container>
  );
};

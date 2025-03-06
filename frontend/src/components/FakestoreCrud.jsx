import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Plus, ShoppingCart, Star, User } from "lucide-react";
import { Spinner } from "react-bootstrap";
import { Loading } from "./ui/Spinner";
import { useData } from "../context/DataContext";
import { ListGroup, Container } from "react-bootstrap";

export const API_URL = "https://fakestoreapi.com";

// 🔹 Utility function for fetching data
const fetchData = async (endpoint, setter, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const response = await axios.get(`${API_URL}/${endpoint}`);
    setter(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const UsersCard = () => {
  const { users, loading } = useData();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-center">Users</h2>
        <button
          onClick={() => navigate("/add-user")}
          className="btn btn-primary"
        >
          <Plus />
        </button>
      </div>
      {loading ? (
        <div className="text-center mt-3">Loading...</div>
      ) : (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              <Link to={`/users/${user.id}`} className="text-decoration-none">
                <strong>Username:</strong> {user.username} <br />
                <strong>Email:</strong> {user.email} <br />
                <strong>Phone:</strong> {user.phone} <br />
                <strong>Name:</strong> {user.name?.firstname}{" "}
                {user.name?.lastname} <br />
                <strong>Address:</strong> {user.address?.street},{" "}
                {user.address?.city}, {user.address?.zipcode}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 🔹 User Details
export const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(`users/${id}`, setUser, setLoading);
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-3">
        <Loading />
      </p>
    );
  if (!user) return <p className="text-center mt-3">User not found</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-primary">
        {user.username} <User />
      </h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

// 🔹 Products List
export const Products = () => {
  const { products, loading } = useData(); // Get data from context
  const navigate = useNavigate();

  const addProduct = () => {
    navigate("/add-product");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-center">
          Products <ShoppingCart />
        </h2>
        <button onClick={addProduct} className="btn btn-success">
          <Plus />
        </button>
      </div>
      {loading ? (
        <div className="text-center mt-3">
          <Loading />
        </div>
      ) : (
        <Container className="mt-4">
      <h2 className="text-center mb-4">Product List</h2>
      <ListGroup variant="flush" className="shadow-sm rounded">
        {products.map((product) => (
          <ListGroup.Item
            key={product.id}
            className="d-flex align-items-center gap-3 p-3"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              rounded
              style={{ width: "50px", height: "50px", objectFit: "contain" }}
            />

            {/* Product Details */}
            <div className="flex-grow-1">
              <Link
                to={`/products/${product.id}`}
                className="text-decoration-none fw-bold text-dark"
              >
                {product.title}
              </Link>
              <div className="text-muted small">{product.category?.toUpperCase()}</div>
            </div>

            {/* Price & Rating */}
            <div className="text-end">
              <h5 className="fw-bold text-success mb-1">${product?.price}</h5>
              <Badge bg="warning" text="dark">
                <Star size={12} className="mb-1" /> {product.rating?.rate} ({product.rating?.count})
              </Badge>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
      )}
    </div>
  );
};

// 🔹 Product Details
export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(`products/${id}`, setProduct, setLoading);
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-3">
        <Loading />
      </p>
    );
  if (!product) return <p className="text-center mt-3">Product not found</p>;

  return (
    <div className="container mt-4 text-center">
      <h2 className="text-danger">{product.title}</h2>
      <p className="fw-bold">Price: ${product.price}</p>
      <img
        src={product.image}
        alt={product.title}
        className="img-fluid rounded"
        width={200}
      />
    </div>
  );
};

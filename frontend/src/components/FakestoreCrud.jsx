import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Plus, ShoppingCart, User } from "lucide-react";
import { Spinner } from "react-bootstrap";
import { Loading } from "./ui/Spinner";

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

// 🔹 Users List
export const UsersCard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("users", setUsers, setLoading);
    }, []);

    const addUser = () => {
        navigate("/add-user");
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-center">Users</h2>
                <button onClick={addUser} className="btn btn-primary"><Plus /></button>
            </div>
            {loading ? (
                <div className="text-center mt-3"><Loading /></div>
            ) : (
                <ul className="list-group">
                    {users.map((user) => (
                        <li key={user.id} className="list-group-item">
                            <Link to={`/users/${user.id}`} className="text-decoration-none">{user.username}</Link>
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

    if (loading) return <p className="text-center mt-3"><Loading /></p>;
    if (!user) return <p className="text-center mt-3">User not found</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-primary">{user.username} <User /></h2>
            <p>Email: {user.email}</p>
        </div>
    );
};

// 🔹 Products List
export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("products", setProducts, setLoading);
    }, []);

    const addProduct = () => {
        navigate("/add-product");
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-center">Products <ShoppingCart /></h2>
                <button onClick={addProduct} className="btn btn-success"><Plus /></button>
            </div>
            {loading ? (
                <div className="text-center mt-3"><Loading /></div>
            ) : (
                <ul className="list-group">
                    {products.map((product) => (
                        <li key={product.id} className="list-group-item">
                            <Link to={`/products/${product.id}`} className="text-decoration-none">{product.title}</Link>
                        </li>
                    ))}
                </ul>
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

    if (loading) return <p className="text-center mt-3"><Loading /></p>;
    if (!product) return <p className="text-center mt-3">Product not found</p>;

    return (
        <div className="container mt-4 text-center">
            <h2 className="text-danger">{product.title}</h2>
            <p className="fw-bold">Price: ${product.price}</p>
            <img src={product.image} alt={product.title} className="img-fluid rounded" width={200} />
        </div>
    );
};

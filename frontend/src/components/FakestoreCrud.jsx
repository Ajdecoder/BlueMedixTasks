import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Plus, ShoppingCart, Star, User, X } from "lucide-react";
import { Button, Card, CardHeader, CardTitle, Spinner } from "react-bootstrap";
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
  const { users, loading, setUsers } = useData();
  const navigate = useNavigate();

  const handleRemoveClick = (uid) => {
    setUsers(users.filter((user) => user.id !== uid));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Users</h2>
        <Button
          onClick={() => navigate("/add-user")}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
        </Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-lg font-medium">
          <Spinner />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <Card
              key={user.id}
              className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="flex items-center gap-4 bg-gray-100 p-4 rounded-t-xl">
                <User size={36} className="text-blue-600" />
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {user.username}
                </CardTitle>
              </CardHeader>

              <div className="p-4 space-y-2 text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Name:</span>{" "}
                  {user.name?.firstname} {user.name?.lastname}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Address:</span>{" "}
                  {user.address?.street}, {user.address?.city},{" "}
                  {user.address?.zipcode}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-b-xl flex justify-between align-items-center">
                <Link
                  to={`/users/${user.id}`}
                  className="text-blue-500 font-medium hover:text-blue-700 transition no-underline"
                >
                  View Profile →
                </Link>

                <button
                  onClick={() => handleRemoveClick(user.id)}
                  className="bg-green-600 p-2 rounded-lg transition-colors duration-300 hover:bg-red-700"
                >
                  <X />
                </button>
              </div>
            </Card>
          ))}
        </div>
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
      <div className="flex justify-center items-center min-h-[200px]">
        <Loading />
      </div>
    );

  if (!user)
    return (
      <p className="text-center text-red-500 font-medium mt-4">
        User not found
      </p>
    );

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-xl p-6 border">
      <div className="flex items-center gap-3 border-b pb-4">
        <User size={36} className="text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          {user.username}
        </h2>
      </div>

      <div className="mt-4 space-y-2 text-gray-700">
        <p>
          <span className="font-medium text-gray-900">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium text-gray-900">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-medium text-gray-900">Name:</span>{" "}
          {user.name?.firstname} {user.name?.lastname}
        </p>
        <p>
          <span className="font-medium text-gray-900">Address:</span>{" "}
          {user.address?.street}, {user.address?.city}, {user.address?.zipcode}
        </p>
      </div>
    </div>
  );
};

// 🔹 Products List
export const Products = () => {
  const { products, loading, setProducts } = useData();
  const navigate = useNavigate();

  const handleRemoveClick = (pid) => {
    setProducts(products.filter((product) => product.id !== pid));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Products <ShoppingCart className="text-green-500" />
        </h2>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">
          <Spinner />
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition border "
            >
              <button
                onClick={() => handleRemoveClick(product.id)}
                className="bg-green-600 p-2 rounded-lg transition-colors duration-300 hover:bg-red-700 relative left-[85%]"
              >
                <X />
              </button>

              <Link className="no-underline" to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-3 rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm uppercase tracking-wide">
                  {product.category}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} />
                    <span className="ml-1">
                      {product.rating?.rate} ({product.rating?.count})
                    </span>
                  </div>
                </div>
              </Link>

              <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
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
      <div className="flex justify-center items-center min-h-[200px]">
        <Loading />
      </div>
    );

  if (!product)
    return (
      <p className="text-center text-red-500 font-medium mt-4">
        Product not found
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain rounded-lg"
        />

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
          <p className="text-gray-700 text-lg mt-2">{product.description}</p>
          <p className="text-green-600 font-bold text-xl mt-3">
            ${product.price}
          </p>
          <div className="flex items-center text-yellow-500 mt-2">
            <Star size={20} />
            <span className="ml-1 text-lg">
              {product.rating?.rate} ({product.rating?.count})
            </span>
          </div>
          <button className="mt-5 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../../context/DataContext";

export const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
    rating: { rate: "", count: "" },
  });
  const navigate = useNavigate();
  const { addProduct } = useData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rate" || name === "count") {
      setProduct({ ...product, rating: { ...product.rating, [name]: value } });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", product);
      addProduct({
        ...product,
        id: Date.now(),
        price: parseFloat(product.price),
        rating: { rate: parseFloat(product.rating.rate), count: parseInt(product.rating.count) },
      });
      alert("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Add New Product</h2>
          </div>
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Product Title
                </label>
                <input
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="e.g., Premium Wireless Headphones"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="e.g., Electronics"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  id="image"
                  type="url"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={product.description}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="Detailed product description..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                    Rating (0-5)
                  </label>
                  <input
                    id="rate"
                    type="number"
                    name="rate"
                    min="0"
                    max="5"
                    step="0.1"
                    value={product.rating.rate}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="4.5"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                    Review Count
                  </label>
                  <input
                    id="count"
                    type="number"
                    name="count"
                    min="0"
                    value={product.rating.count}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="120"
                    required
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export const AddUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    name: { firstname: "", lastname: "" },
    phone: "",
  });
  const navigate = useNavigate();
  const { addUser } = useData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("name.")) {
      const field = name.split(".")[1];
      setUser({ ...user, name: { ...user.name, [field]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://jsonplaceholder.typicode.com/users", user);
      addUser({ ...user, id: Date.now() });
      alert("User added successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Create New User</h2>
          </div>
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    name="name.firstname"
                    value={user.name.firstname}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="name.lastname"
                    value={user.name.lastname}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="johndoe123"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-700 focus:ring-blue-500 focus:border-blue-500 p-2"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Create User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Tailwind utility classes
const inputFieldStyles = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
const btnSubmitStyles = "w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition";

document.styleSheets[0].insertRule(`.input-field { ${inputFieldStyles} }`, 0);
document.styleSheets[0].insertRule(`.btn-submit { ${btnSubmitStyles} }`, 0);
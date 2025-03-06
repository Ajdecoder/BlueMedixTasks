import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const API_URL = "https://fakestoreapi.com";

// Create Context
const DataContext = createContext();

// Custom Hook for accessing context
export const useData = () => useContext(DataContext);

// Provider Component
export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch users & products on load
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, productsRes] = await Promise.all([
                    axios.get(`${API_URL}/users`),
                    axios.get(`${API_URL}/products`)
                ]);
                setUsers(usersRes.data);
                setProducts(productsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to add user locally
    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, { id: prevUsers.length + 1, ...newUser }]);
    };

    // Function to add product locally
    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, { id: prevProducts.length + 1, ...newProduct }]);
    };

    return (
        <DataContext.Provider value={{ users, products, loading, addUser, addProduct }}>
            {children}
        </DataContext.Provider>
    );
};

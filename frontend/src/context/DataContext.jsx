import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../components/FakestoreCrud";


// Create Context
const DataContext = createContext();

// Custom Hook for accessing context
export const useData = () => useContext(DataContext);

// Provider Component
export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
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

    const addUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, { id: prevUsers.length + 1, ...newUser }]);
    };

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, { id: prevProducts.length + 1, ...newProduct }]);
    };

    return (
        <DataContext.Provider value={{ users, products, loading, addUser, addProduct }}>
            {children}
        </DataContext.Provider>
    );
};

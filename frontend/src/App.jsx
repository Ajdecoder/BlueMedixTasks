import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductDetails, Products, UserDetails, UsersCard } from "./components/FakestoreCrud";
import { NavbarComponent } from "./components/ui/Navbar";
import Dashboard from "./components/Dashboard";
import { HomePage } from "./components/Home";
import { DataProvider } from "./context/DataContext";
import AddUser, { AddProduct } from "./components/AddUps/Add";
const App = () => {
  return (
   <DataProvider>
     <Router>
      <NavbarComponent/> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersCard />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
   </DataProvider>
  );
};

export default App;
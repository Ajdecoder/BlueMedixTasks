import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductDetails, Products, UserDetails, UsersCard } from "./components/FakestoreCrud";
import { NavbarComponent } from "./components/ui/Navbar";
import Dashboard from "./components/Dashboard";
import { HomePage } from "./components/Home";
const App = () => {
  return (
    <Router>
      <NavbarComponent/> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersCard />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add-user" element={<ProductDetails />} />
        <Route path="/add-product" element={<ProductDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
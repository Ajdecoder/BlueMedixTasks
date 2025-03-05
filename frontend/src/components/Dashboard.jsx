import { useState } from "react";
import { Home, Users, Package } from "lucide-react";
import { Products, UsersCard } from "./FakestoreCrud";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Users");

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar Navigation */}
      <nav className="d-flex flex-column p-3 bg-white shadow-lg" style={{ width: "250px" }}>
        <h1 className="text-center fw-bold mb-4">Dashboard</h1>
        <button
          className={`btn ${activeSection === "Users" ? "btn-primary" : "btn-outline-primary"} d-flex align-items-center mb-2`}
          onClick={() => setActiveSection("Users")}
        >
          <Users size={20} className="me-2" /> Users
        </button>
        <button
          className={`btn ${activeSection === "Products" ? "btn-primary" : "btn-outline-primary"} d-flex align-items-center`}
          onClick={() => setActiveSection("Products")}
        >
          <Package size={20} className="me-2" /> Products
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        {activeSection === "Users" && (
          <section>
            <h2 className="fw-semibold mb-3">Users Section</h2>
            <div className="card">
              <div className="card-body">
                <Users/>
                <UsersCard/>
              </div>
            </div>
          </section>
        )}
        {activeSection === "Products" && (
          <section>
            <h2 className="fw-semibold mb-3 ">Products Section</h2>
            <div className="card">
              <div className="card-body">
                <Products/>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

import "./DashBoard.css";
import { useEffect, useState } from "react";
import API from "../../../api/productApi";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

function DashBoard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);
  
  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">
          <FaBoxOpen className="icon" />
          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="card">
          <FaShoppingCart className="icon" />
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="card">
          <FaUsers className="icon" />
          <h3>Customers</h3>
          <h2>{stats.totalCustomers}</h2>
        </div>

        <div className="card">
          <FaMoneyBillWave className="icon" />
          <h3>Revenue</h3>
          <h2>₦{stats.totalRevenue.toLocaleString()}</h2>
        </div>

      </div>

    </div>
  );
}

export default DashBoard;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CheckOut from "./pages/CheckOut/CheckOut";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";

import AdminLayout from "./pages/Admin/AdminLayout";
import DashBoard from "./pages/Admin/DashBoard";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Categories from "./pages/Admin/Categories";
import Customers from "./pages/Admin/Customers";
import MyOrders from "./pages/MyOrders/MyOrders";
import Profile from "./pages/Profile/Profile";
import Delivery from "./pages/Admin/Delivery";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================
            CUSTOMER PAGES
        ===================== */}

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          }
        />

<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/order-success/:id"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>
<Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />


        {/* =====================
            ADMIN PAGES
        ===================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          {/* /admin */}
          <Route
            index
            element={<DashBoard />}
          />

          {/* /admin/products */}
          <Route
            path="products"
            element={<Products />}
          />

          {/* /admin/orders */}
          <Route
            path="orders"
            element={<Orders />}
          />

          {/* /admin/categories */}
          <Route
            path="categories"
            element={<Categories />}
          />

          <Route path="customers" element={<Customers/>}/>

          <Route path="delivery" element={<Delivery/>}/>



        </Route>

      </Routes>


    </BrowserRouter>
  );
}

export default App;
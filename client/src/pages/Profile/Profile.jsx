import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  if (!user) {
    navigate("/login");
    return null;
  }

  const initial = (
    user.name?.charAt(0) ||
    user.email?.charAt(0) ||
    "U"
  ).toUpperCase();

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          {initial}
        </div>

        <h1>{user.name}</h1>

        <p className="profile-email">
          {user.email}
        </p>

        <div className="profile-details">

          <div className="profile-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-row">
            <span>Phone</span>
            <strong>
              {user.phone || "Not provided"}
            </strong>
          </div>

          <div className="profile-row">
            <span>Account Type</span>
            <strong>
              {user.role === "admin"
                ? "Administrator"
                : "Customer"}
            </strong>
          </div>

        </div>

        <button
          className="orders-profile-btn"
          onClick={() => navigate("/my-orders")}
        >
          View My Orders
        </button>

      </div>

    </div>
  );
}

export default Profile;
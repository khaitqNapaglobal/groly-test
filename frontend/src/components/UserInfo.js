import React from "react";
import { useNavigate } from "react-router-dom";

function UserInfo({ user }) {
  const navigate = useNavigate();

  if (!user) {
    // Nếu chưa đăng nhập, quay về trang chủ
    navigate("/");
    return null;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>User Information</h2>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <button onClick={() => navigate("/")} style={{ padding: "10px 20px" }}>
        Back to Home
      </button>
    </div>
  );
}

export default UserInfo;

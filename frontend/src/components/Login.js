import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  return (
    <div className="home">
      <div className="home-card">
        <h1>Login</h1>
        <form>
          <div>
            <input
              type="email"
              placeholder="Email"
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              style={{
                width: "100%",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" style={{ marginLeft: "5px" }}>
              Remember me
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
}

export default Login;

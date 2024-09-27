import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you have this import

const AdminLogin = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSuccess = (message) => {
    console.log(message);
  };
  const handleError = (message) => {
    console.log(message);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      if (!response.ok) {
        const { error, message } = result;
        if (error && error.details) {
          handleError(error.details[0].message || message);
        } else {
          handleError(message || "An error occurred during login");
        }
        return;
      }

      const { success, message, token, user } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", user.name);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        handleError(message || "Login failed");
      }
    } catch (err) {
      handleError("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-box">
        <h1 className="heading1">Login</h1>
        <div className="form-box">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-box-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="form-box-input"
                value={loginInfo.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-box-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="***************"
                className="form-box-input"
                value={loginInfo.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="form-box-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

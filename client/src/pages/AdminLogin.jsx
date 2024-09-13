import React from "react";

const AdminLogin = () => {
  return (
    <div className="login-page">
      <div className="login-bg-box">
        <h1 className="heading1">Login</h1>

        <div className="form-box">
          <form>
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
                required
              />
            </div>
            <button type="submit" className="form-box-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

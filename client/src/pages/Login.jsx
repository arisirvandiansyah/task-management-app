import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center px-12">
      <div className="w-64">
        <div className="p-5 rounded bg-white shadow-lg">
          <div className="mb-3">
            <h1>Login</h1>
            <p>Please fill in this form to login.</p>
          </div>
          <div className="mb-3">
            <form action="">
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="eg: 0qTgG@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="******" />
              </div>
              <div className="mb-3">
                <button type="submit" className="w-full">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="mb-3">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

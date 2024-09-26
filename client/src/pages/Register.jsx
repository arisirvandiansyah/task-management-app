import React from "react";

const Register = () => {
  return (
    <div className="h-screen flex justify-center items-center lg:px-12 px-6">
      <div className="lg:w-2/5 w-full">
        <div className="p-6 bg-white rounded shadow-lg">
          <div className="mb-3">
            <h1 className="mb-1">Register</h1>
            <p>Please fill in this form to create an account.</p>
          </div>
          <div className="mb-3">
            <form action="">
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="eg: John Doe" />
              </div>
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
                <label htmlFor="confirmPassword">Password Confirmation</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="******"
                />
              </div>
              <div className="mb-3 flex items-center gap-2">
                <input type="checkbox" name="is_manager" />{" "}
                <span>Register as MANAGER</span>
              </div>
              <div className="mb-3">
                <button type="submit" className="hover:bg-teal-700">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="mb-3">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

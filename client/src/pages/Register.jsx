import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Error, Success } from "../components/ResponseMsg";

const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_manager: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, form, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          setLoading(false);
          setMsg(<Success msg={res.data.msg} />);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setLoading(false);
          setMsg(<Error msg={err.response.data.msg} />);
        });
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }, 1000);
  };

  return (
    <div className="h-screen flex justify-center items-center lg:px-12 px-6">
      {msg && msg}
      <div className="lg:w-2/5 w-full">
        <div className="p-6 bg-white rounded shadow-lg">
          <div className="mb-3">
            <h1 className="mb-1">Register</h1>
            <p>Please fill in this form to create an account.</p>
          </div>
          <div className="mb-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="eg: John Doe"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="eg: 0qTgG@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="******"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword">Password Confirmation</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="******"
                />
              </div>
              <div className="mb-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_manager"
                  onChange={(e) =>
                    setForm({ ...form, is_manager: e.target.checked })
                  }
                />{" "}
                <span>Register as MANAGER</span>
              </div>
              <div className="mb-3">
                <button type="submit" className="hover:bg-teal-700">
                  {loading ? "Registering..." : "Register"}
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

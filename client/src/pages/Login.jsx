import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Error, Success } from "../components/ResponseMsg";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, form, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          setLoading(false);
          setMsg(<Success msg={res.data.msg} />);
          setTimeout(() => {
            navigate("/");
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
    <div className="h-screen flex justify-center items-center px-12">
      {msg && msg}
      <div className="w-64">
        <div className="p-5 rounded bg-white shadow-lg">
          <div className="mb-3">
            <h1>Login</h1>
            <p>Please fill in this form to login.</p>
          </div>
          <div className="mb-3">
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
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

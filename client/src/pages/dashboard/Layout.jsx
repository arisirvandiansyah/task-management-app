import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  IoReorderThreeOutline,
  IoClose,
  IoLogOutOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loginInfo, setLoginInfo] = useState({});

  const getLoginInfo = async () => {
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}/auth/token`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        const token = res.data.accessToken;
        const decoded = jwtDecode(token);
        setLoginInfo(decoded);
      })
      .catch((err) => {
        console.log(err.response.data);
        navigate("/login");
      });
  };

  const navActive = () => {
    const segment = window.location.pathname;
    document
      .querySelector('a[href="' + segment + '"]')
      .classList.add("text-teal-500");
  };

  const logout = () => {
    setTimeout(async () => {
      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
          withCredentials: true,
          credentials: "same-origin",
        })
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }, 1000);
  };

  useEffect(() => {
    navActive();
    getLoginInfo();
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 bg-white px-5 py-1 ${
          sidebarOpen ? "lg:ml-56 ml-0" : "ml-0"
        } treansition-all duration-300`}
      >
        <div className="flex justify-between items-center">
          <button
            className="text-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <IoReorderThreeOutline />
          </button>
          <span>{loginInfo?.name}</span>
        </div>
      </header>
      <aside
        className={`fixed top-0 w-56 h-screen shadow-lg bg-white px-6 py-1 ${
          sidebarOpen ? "lg:ml-0 -ml-56" : "lg:-ml-56 ml-0"
        } transition-all duration-300`}
      >
        <div className="flex flex-row-reverse">
          <button
            className="text-lg lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <IoClose />
          </button>
        </div>
        <div className="lg:mt-14 mt-4 pt-0.5">
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="/"
                className="text-neutral-600 hover:text-teal-500 hover:no-underline transition-all duration-300"
              >
                Dashboard
              </a>
            </li>
            <li className="block font-semibold">TASK MANAGEMENT</li>
            <li>
              <a
                href="/tasks/create"
                className="text-neutral-600 hover:text-teal-500 hover:no-underline transition-all duration-300"
              >
                Add Task
              </a>
            </li>
            <li className="block font-semibold">SETTING</li>
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full hover:text-teal-500"
              >
                <IoLogOutOutline className="" /> <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <main
        className={`p-5 ${
          sidebarOpen ? "lg:ml-56 ml-0" : "ml-0"
        } transition-all duration-300`}
      >
        {children({ loginInfo })}
      </main>
    </>
  );
};

export default Layout;

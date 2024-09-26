import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axiosJWT from "../../hooks/axiosInter";
import { Error, Success } from "../../components/ResponseMsg";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [employee, setEmployee] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    assigned_to: "",
    deadline: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await axiosJWT
        .post(`${import.meta.env.VITE_SERVER_URL}/task`, form)
        .then((res) => {
          if (res.data) {
            setMsg(<Success msg={res.data.msg} />);
            setLoading(false);
            setTimeout(() => {
              setMsg("");
              navigate("/");
            }, 3000);
          }
        })
        .catch((err) => {
          setMsg(<Error msg={err.response.data.msg} />);
          setLoading(false);
          setTimeout(() => {
            setMsg("");
          }, 3000);
        });
      setLoading(false);
    }, 1000);
  };

  const getEmployee = async () => {
    await axiosJWT
      .get(`${import.meta.env.VITE_SERVER_URL}/user/employee/all`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <Layout>
      {({ loginInfo }) => {
        return (
          <>
            {msg && msg}
            <div className="mb-6">
              <h1>Create Task</h1>
            </div>
            <div className="p-3 bg-white rounded shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    name="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="eg: Write a blog post"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    className="min-h-16"
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="eg: Write a blog post"
                  ></textarea>
                </div>
                <div className="lg:flex justify-between gap-2 mb-3">
                  {loginInfo.is_manager && (
                    <div className="mb-3 w-full">
                      <label htmlFor="assigned_to">Assigned To</label>
                      <select
                        name="assigned_to"
                        onChange={(e) =>
                          setForm({ ...form, assigned_to: e.target.value })
                        }
                      >
                        <option value="" hidden>
                          -- Select Employee --
                        </option>
                        {employee?.map((emp) => (
                          <option key={emp._id} value={emp._id}>
                            {emp.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="mb-3 w-full">
                    <label htmlFor="deadline">Deadline</label>
                    <input
                      type="datetime-local"
                      name="deadline"
                      onChange={(e) =>
                        setForm({ ...form, deadline: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </>
        );
      }}
    </Layout>
  );
};

export default CreateTask;

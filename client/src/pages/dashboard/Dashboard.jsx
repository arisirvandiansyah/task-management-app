import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axiosJWT from "../../hooks/axiosInter";
import { IoClose } from "react-icons/io5";
import Modal from "../../components/Modal";
import { Success } from "../../components/ResponseMsg";
import moment from "moment";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState({});
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [employee, setEmployee] = useState([]);

  const getTask = async () => {
    await axiosJWT
      .get(`${import.meta.env.VITE_SERVER_URL}/task/all`)
      .then((res) => {
        setCount(res.data.count);
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTaskById = async (id) => {
    await axiosJWT
      .get(`${import.meta.env.VITE_SERVER_URL}/task/${id}`)
      .then((res) => {
        setModalData(res.data);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTask = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await axiosJWT
        .put(
          `${import.meta.env.VITE_SERVER_URL}/task/${modalData._id}`,
          modalData
        )
        .then((res) => {
          setMsg(<Success msg={res.data.msg} />);
          setShowModal(false);
          getTask();
          setTimeout(() => {
            setMsg("");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      {({ loginInfo }) => {
        const getEmployee = async () => {
          await axiosJWT
            .get(`${import.meta.env.VITE_SERVER_URL}/user/employee/all`)
            .then((res) => {
              setEmployee(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        useEffect(() => {
          getTask();
          if (loginInfo.is_manager) {
            getEmployee();
          }
        }, []);

        return (
          <>
            {msg && msg}
            <div className="mb-6">
              <div className="mb-3">
                <h1>Task Report</h1>
              </div>
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
                <div className="p-3 bg-white rounded shadow-lg">
                  <h2 className="font-semibold lg:text-2xl text-xl text-orange-500">
                    Pending
                  </h2>
                  <p className="lg:text-4xl text-2xl font-semibold">
                    {count.pending}
                  </p>
                </div>
                <div className="p-3 bg-white rounded shadow-lg">
                  <h2 className="font-semibold lg:text-2xl text-xl text-yellow-500">
                    In Progress
                  </h2>
                  <p className="lg:text-4xl text-2xl font-semibold">
                    {count.inProgress}
                  </p>
                </div>
                <div className="p-3 bg-white rounded shadow-lg">
                  <h2 className="font-semibold lg:text-2xl text-xl text-cyan-500">
                    Waiting For Review
                  </h2>
                  <p className="lg:text-4xl text-2xl font-semibold">
                    {count.waiting}
                  </p>
                </div>
                <div className="p-3 bg-white rounded shadow-lg">
                  <h2 className="font-semibold lg:text-2xl text-xl text-red-500">
                    Rejected
                  </h2>
                  <p className="lg:text-4xl text-2xl font-semibold">
                    {count.rejected}
                  </p>
                </div>
                <div className="p-3 bg-white rounded shadow-lg">
                  <h2 className="font-semibold lg:text-2xl text-xl text-green-500">
                    Completed
                  </h2>
                  <p className="lg:text-4xl text-2xl font-semibold">
                    {count.completed}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-6">
                <h1>Task Record</h1>
              </div>
              <div className="p-5 bg-white rounded shadow-lg">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Task</th>
                      <th className="lg:table-cell hidden">Assigned By</th>
                      <th className="lg:table-cell hidden">Assigned To</th>
                      <th className="lg:table-cell hidden">Deadline</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks
                      ? tasks.map((task) => (
                          <tr key={task._id}>
                            <td className="text-left">{task.name}</td>
                            <td className="lg:table-cell hidden">
                              {task.assigned_by.name}
                            </td>
                            <td className="lg:table-cell hidden">
                              {task.assigned_to.name}
                            </td>
                            <td className="lg:table-cell hidden">
                              <p>
                                {moment(task.deadline).format(
                                  " dddd, d MMMM YYYY"
                                )}
                              </p>
                              <p>{moment(task.deadline).format("hh:mm A")}</p>
                            </td>
                            <td className="">
                              <p
                                className={`${
                                  task.status === "Completed"
                                    ? "bg-green-500"
                                    : task.status === "Rejected"
                                    ? "bg-red-500"
                                    : task.status === "In-progress"
                                    ? "bg-yellow-500"
                                    : task.status === "Waiting"
                                    ? "bg-cyan-500"
                                    : "bg-orange-500"
                                } text-white text-center px-3 py-2 font-semibold rounded`}
                              >
                                {task.status}
                              </p>
                            </td>
                            <td className="flex justify-center">
                              <button
                                onClick={() => getTaskById(task._id)}
                                className="bg-cyan-500 text-white rounded px-3 py-2 hover:bg-cyan-600 block"
                              >
                                View Task
                              </button>
                            </td>
                          </tr>
                        ))
                      : "No tasks found"}
                  </tbody>
                </table>
              </div>
            </div>
            {showModal && (
              <Modal>
                <div className="mb-2">
                  <p className="text-end">
                    <button onClick={() => setShowModal(false)}>
                      <IoClose size={20} />
                    </button>
                  </p>
                  <div className="flex justify-between"></div>
                  <h1>Task : {modalData._id}</h1>
                </div>
                <div className="mb-2">
                  <form onSubmit={updateTask}>
                    <div className="mb-3">
                      <label htmlFor="Name">Name</label>
                      <input
                        type="text"
                        name="Name"
                        value={modalData.name}
                        onChange={
                          modalData.assigned_by._id === loginInfo._id
                            ? (e) =>
                                setModalData({
                                  ...modalData,
                                  name: e.target.value,
                                })
                            : undefined
                        }
                        disabled={
                          modalData.assigned_by._id !== loginInfo._id
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        className="min-h-16 max-h-24"
                        value={modalData.description}
                        onChange={
                          modalData.assigned_by._id === loginInfo._id
                            ? (e) =>
                                setModalData({
                                  ...modalData,
                                  description: e.target.value,
                                })
                            : undefined
                        }
                        disabled={
                          modalData.assigned_by._id !== loginInfo._id
                            ? true
                            : false
                        }
                      ></textarea>
                    </div>
                    {loginInfo.is_manager && (
                      <div className="lg:flex justify-between gap-2 mb-3">
                        <div className="mb-3 w-full">
                          <label htmlFor="assigned_to">Assigned To</label>
                          <select
                            name="assigned_to"
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                assigned_to: e.target.value,
                              })
                            }
                          >
                            <option value={modalData.assigned_to._id} hidden>
                              {modalData.assigned_to.name}
                            </option>
                            {employee.map((emp, i) => (
                              <option key={i} value={emp._id}>
                                {emp.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 w-full">
                          <label htmlFor="deadline">Deadline</label>
                          <input
                            type="datetime-local"
                            name="deadline"
                            value={moment(modalData.deadline).format(
                              "YYYY-MM-DDTHH:mm"
                            )}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                deadline: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="status">Status</label>
                      <select
                        name="status"
                        value={modalData.status}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value={modalData.status} hidden>
                          {modalData.status}
                        </option>
                        <option value="In-progress">In-progress</option>
                        {loginInfo.is_manager ||
                        modalData.assigned_by._id === loginInfo._id ? (
                          <>
                            <option value="Waiting">Waiting</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Completed">Completed</option>
                          </>
                        ) : (
                          <option value="Waiting">Ask for Review</option>
                        )}
                      </select>
                    </div>
                    <div className="mb-3 flex flex-row-reverse gap-2">
                      <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="border"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>
            )}
          </>
        );
      }}
    </Layout>
  );
};

export default Dashboard;

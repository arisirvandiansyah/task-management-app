import React, { useState } from "react";
import Layout from "./Layout";

const Dashboard = () => {
  const [count, setCount] = useState({
    pending: 0,
    inProgress: 0,
    waiting: 0,
    rejected: 0,
    completed: 0,
  });
  return (
    <Layout>
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
                <th className="text-left">Deadline</th>
                <th className="text-left">Status</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">Task 1</td>
                <td className="text-left">22-02-2024</td>
                <td className="text-left">Pending</td>
                <td className="text-left">
                  <a
                    href="/task/:id"
                    className="bg-cyan-500 hover:bg-cyan-600 hover:no-underline text-white rounded px-3 py-1"
                  >
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

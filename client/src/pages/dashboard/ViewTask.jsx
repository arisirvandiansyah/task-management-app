import React from "react";
import Layout from "./Layout";

const ViewTask = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1>All Tasks</h1>
      </div>
      <div className="p-3 bg-white rounded shadow-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Task</th>
              <th className="text-left">Description</th>
              <th className="text-left">Deadline</th>
              <th className="text-left">Status</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left">Task 1</td>
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
    </Layout>
  );
};

export default ViewTask;

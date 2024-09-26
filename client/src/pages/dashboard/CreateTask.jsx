import React from "react";
import Layout from "./Layout";

const CreateTask = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1>Create Task</h1>
      </div>
      <div className="p-3 bg-white rounded shadow-lg">
        <form action="">
          <div className="mb-3">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="Name"
              placeholder="eg: Write a blog post"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="min-h-16"
              placeholder="eg: Write a blog post"
            ></textarea>
          </div>
          <div className="lg:flex justify-between gap-2 mb-3">
            <div className="mb-3 w-full">
              <label htmlFor="assigned_to">Assigned To</label>
              <select name="assigned_to">
                <option value="" hidden>
                  -- Select Employee --
                </option>
              </select>
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="deadline">Deadline</label>
              <input type="datetime-local" name="deadline" />
            </div>
          </div>
          <div className="mb-3">
            <button type="submit">Create Task</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTask;

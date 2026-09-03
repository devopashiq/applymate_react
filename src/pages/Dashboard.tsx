import { useState } from "react";

import Cards from "../components/Cards";
import Modal from "../components/Modal";
import JobForm from "../components/JobForm";
import useApplications from "../hooks/useApplications";
import type { JobFormValues, JobResponse } from "../types/job";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { create, loading, error, applications, update, remove } =
    useApplications();
  const [editingJob, setEditingJob] = useState<JobResponse | null>(null);

  function handleEdit(job: JobResponse) {
    setEditingJob(job);
    setIsModalOpen(true);
  }

  async function handleDelete(id: string) {
    try {
      await remove(id);
    } catch {
      // The hook exposes the error message for the dashboard alert.
    }
  }

  function handleAdd() {
    setEditingJob(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingJob(null);
  }

  async function handleSubmitJob(data: JobFormValues) {
    if (editingJob) {
      await update(editingJob.id, data);
    } else {
      await create(data);
    }

    handleCloseModal();
  }

  return (
    <div>
      <div>
        <button
          className="btn btn-primary"
          onClick={handleAdd}
          disabled={loading}
        >
          Add Application
        </button>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <JobForm
            key={editingJob?.id ?? "new"}
            onSubmit={handleSubmitJob}
            job={editingJob}
            submitting={loading}
          />
        </Modal>
      </div>

      {error && (
        <p className="py-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {loading && applications.length === 0 && <h1>Loading applications...</h1>}

        {!loading &&
          applications.length > 0 &&
          applications.map((app) => (
            <Cards
              key={app.id}
              app={app}
              edit={handleEdit}
              remove={handleDelete}
            />
          ))}

        {!loading && applications.length === 0 && <h1>No Application</h1>}
      </div>
    </div>
  );
};

export default Dashboard;

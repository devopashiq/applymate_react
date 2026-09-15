import { useState } from "react";

import Cards from "../components/Cards";
import Modal from "../components/Modal";
import JobForm from "../components/JobForm";
import useApplications from "../hooks/useApplications";
import type { JobFormValues, JobResponse } from "../types/job";
import DeleteConfirmation from "../components/DeleteConfirmation";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { create, loading, error, applications, update, remove } =
    useApplications();
  const [editingJob, setEditingJob] = useState<JobResponse | null>(null);
  const [deletingJob, setDeletingJob] = useState<string | null>(null);

  function handleEdit(job: JobResponse) {
    setEditingJob(job);
    setIsModalOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingJob(id);
  }

  function handleAdd() {
    setEditingJob(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingJob(null);
  }

  function handleCloseDeleteModal() {
    setDeletingJob(null);
  }

  async function handleSubmitJob(data: JobFormValues) {
    if (editingJob) {
      await update(editingJob.id, data);
    } else {
      await create(data);
    }

    handleCloseModal();
  }
  async function handleDeleteJob() {
    if (deletingJob) {
      await remove(deletingJob);
    }

    handleCloseDeleteModal();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Applications</h1>
          <p className="text-sm text-gray-500">
            Track and manage your job applications
          </p>
        </div>

      <button
  className="btn btn-primary"
  onClick={handleAdd}
  disabled={loading}
>
  <span aria-hidden="true">+</span>
  Add Application
</button>
      </div>

      {error && (
        <p className="py-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {loading && applications.length === 0 && (
          <h1>Loading applications...</h1>
        )}

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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <JobForm
          key={editingJob?.id ?? "new"}
          onSubmit={handleSubmitJob}
          job={editingJob}
          submitting={loading}
        />
      </Modal>

      <Modal
        isOpen={deletingJob ? true : false}
        onClose={handleCloseDeleteModal}
      >
        <DeleteConfirmation
          onConfirm={handleDeleteJob}
          onCancel={handleCloseDeleteModal}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;

import { useState, type ChangeEvent } from "react";

import Cards from "../components/Cards";
import Modal from "../components/Modal";
import JobForm from "../components/JobForm";
import useApplications from "../hooks/useApplications";
import type { JobFormValues, JobResponse } from "../types/job";
import DeleteConfirmation from "../components/DeleteConfirmation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as ReactPaginateModule from "react-paginate";
import Pagination from "../components/Pagination";
const ReactPaginate = (ReactPaginateModule as any).default;

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(ReactPaginate);

  const {
    create,
    loading,
    error,
    applications,
    update,
    remove,
    pageNum,
    itemsPerPage,
    totalItems,
    setPageNum,
    setItemsPerPage,
    totalPageCount,
  } = useApplications();
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

  function handlePageChange(page: number) {
    setPageNum(page);
  }

  function handleItemsPerPageChange(event: ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(Number(event.target.value));
    setPageNum(1);
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

        {!loading && applications.length > 0 && (
          <>
          

            {applications.map((app) => (
              <Cards
                key={app.id}
                app={app}
                edit={handleEdit}
                remove={handleDelete}
              />
            ))}

              <div className="flex items-center justify-between gap-4 py-2 text-sm text-on-surface/70">
              <p>
                Showing {applications.length} of {totalItems} applications
              </p>

              <div className="flex">
                
              <label className="flex items-center gap-2">
                <span>Show</span>
                <select
                  className="select select-sm select-bordered w-fit min-w-0"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  disabled={loading}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <p className="block">Per page</p>
              </label>
                    <Pagination
              currentPage={pageNum}
              onPageChange={handlePageChange}
              pageCount={totalPageCount}
            />
              </div>
       
            </div>

        
          </>
        )}

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

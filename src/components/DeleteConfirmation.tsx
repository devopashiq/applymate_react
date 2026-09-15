type deleteModalProps = {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
};

const DeleteConfirmation = ({ onConfirm, onCancel }: deleteModalProps) => {
  async function handleConfirm() {
    await onConfirm();
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div className="w-full max-w-md ">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-gray-900">
          Delete Application
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-900">
          You are about to delete the Job Application.
          <span className="block font-medium text-gray-900">
            Do you wish to continue?
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={handleConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  JOB_STATUSES,
  isJobStatus,
  type JobFormValues,
  type JobResponse,
} from "../types/job";

const EMPTY_FORM_VALUES: JobFormValues = {
  company: "",
  position: "",
  description: "",
  status: "Applied",
};

function getInitialValues(job: JobResponse | null): JobFormValues {
  if (!job) {
    return EMPTY_FORM_VALUES;
  }

  return {
    company: job.company,
    position: job.position,
    description: job.description,
    status: job.status,
  };
}

type JobFormProps = {
  onSubmit: (data: JobFormValues) => Promise<void>;
  job: JobResponse | null;
  submitting?: boolean;
};

const JobForm = ({ onSubmit, job, submitting = false }: JobFormProps) => {
  const [formData, setFormData] = useState<JobFormValues>(() =>
    getInitialValues(job),
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    if (name === "status") {
      if (!isJobStatus(value)) {
        return;
      }

      setFormData((prev) => ({ ...prev, status: value }));
      return;
    }

    if (name === "company" || name === "position" || name === "description") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nextFormData = {
      ...formData,
      company: formData.company.trim(),
      position: formData.position.trim(),
      description: formData.description.trim(),
    };

    if (!nextFormData.company || !nextFormData.position) {
      setSubmitError("Company and position are required.");
      return;
    }

    try {
      setSubmitError(null);
      await onSubmit(nextFormData);
    } catch {
      setSubmitError("Unable to save the application. Please try again.");
    }
  }

  return (
    <div>
      <h1 className="font-bold pb-8">
        {job ? "Edit Job Application" : "Add Job Application"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 rounded-xl p-4 flex flex-col gap-4"
      >
        <fieldset className="fieldset text-sm">
          <legend className="fieldset-legend">Company</legend>

          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            type="text"
            className="input w-full"
            placeholder="Company"
            required
          />
        </fieldset>

        <fieldset className="fieldset text-sm">
          <legend className="fieldset-legend">Position</legend>

          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            type="text"
            className="input w-full"
            placeholder="Position"
            required
          />
        </fieldset>

        <fieldset className="fieldset text-sm">
          <legend className="fieldset-legend">Description</legend>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea h-24 w-full"
            placeholder="Description"
          />
        </fieldset>

        <fieldset className="fieldset text-sm">
          <legend className="fieldset-legend">Status</legend>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select w-full"
          >
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </fieldset>

        {submitError && (
          <p className="text-sm text-red-600" role="alert">
            {submitError}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : job ? "Edit" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;

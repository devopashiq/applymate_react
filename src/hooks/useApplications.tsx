import { useEffect, useState } from "react";
import { applicationApi } from "../api/application.api";import type { CreateJobDto, JobResponse, UpdateJobDto } from "../types/job";

async function fetchApplications() {
  const response = await applicationApi.loadAllApplication();
  return response.data.data;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

const useApplications = () => {
  const [applications, setApplications] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadAll() {
    try {
      setLoading(true);
      setError(null);
      setApplications(await fetchApplications());
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function create(data: CreateJobDto) {
    try {
      setLoading(true);
      setError(null);
      await applicationApi.createApplication(data);
      setApplications(await fetchApplications());
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function update(id: string, data: UpdateJobDto) {
    try {
      setLoading(true);
      setError(null);
      await applicationApi.updateApplication(id, data);
      setApplications(await fetchApplications());
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    try {
      setLoading(true);
      setError(null);
      await applicationApi.deleteApplication(id);
      setApplications(await fetchApplications());
    } catch (error) {
      setError(getErrorMessage(error));
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialApplications() {
      try {
        const nextApplications = await fetchApplications();

        if (!ignore) {
          setApplications(nextApplications);
        }
      } catch (error) {
        if (!ignore) {
          setError(getErrorMessage(error));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadInitialApplications();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    loadAll,
    create,
    update,
    remove,
    loading,
    error,
    applications
 }

 
};

export default useApplications;

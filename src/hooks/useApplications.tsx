import { useEffect, useState } from "react";
import { applicationApi } from "../api/application.api";
import type {
  CreateJobDto,
  JobResponse,
  PaginatedJobsResponse,
  UpdateJobDto,
} from "../types/job";

const FIRST_PAGE = 1;
const DEFAULT_ITEMS_PER_PAGE = 10;

type ApplicationsPage = {
  applications: JobResponse[];
  totalItems: number;
  totalPages: number;
};

function normalizeApplicationsResponse(
  data: JobResponse[] | PaginatedJobsResponse,
): ApplicationsPage {
  if (Array.isArray(data)) {
    return {
      applications: data,
      totalItems: data.length,
      totalPages: data.length > 0 ? 1 : 0,
    };
  }

  return {
    applications: data.jobs,
    totalItems: data.total,
    totalPages: data.totalPages,
  };
}

async function fetchApplications(page: number, limit: number) {
  const response = await applicationApi.loadAllApplication(page, limit);
  return normalizeApplicationsResponse(response.data.data);
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
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [pageNum, setPageNum] = useState(FIRST_PAGE);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);

  function applyApplicationsPage(nextPage: ApplicationsPage) {
    setApplications(nextPage.applications);
    setTotalItems(nextPage.totalItems);
    setTotalPageCount(nextPage.totalPages);
  }

  async function loadAll() {
    try {
      setLoading(true);
      setError(null);
      applyApplicationsPage(await fetchApplications(pageNum, itemsPerPage));
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
      setPageNum(FIRST_PAGE);
      applyApplicationsPage(await fetchApplications(FIRST_PAGE, itemsPerPage));
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
      applyApplicationsPage(await fetchApplications(pageNum, itemsPerPage));
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
      const nextPage = await fetchApplications(pageNum, itemsPerPage);

      if (nextPage.applications.length === 0 && pageNum > FIRST_PAGE) {
        const previousPage = pageNum - 1;
        setPageNum(previousPage);
        applyApplicationsPage(
          await fetchApplications(previousPage, itemsPerPage),
        );
      } else {
        applyApplicationsPage(nextPage);
      }
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
        setLoading(true);
        setError(null);
        const nextPage = await fetchApplications(pageNum, itemsPerPage);

        if (!ignore) {
          applyApplicationsPage(nextPage);
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
  }, [pageNum, itemsPerPage]);

  return {
    loadAll,
    create,
    update,
    remove,
    loading,
    error,
    applications,
    pageNum,
    itemsPerPage,
    totalItems,
    setItemsPerPage,
    setPageNum,
    totalPageCount,
  };
};

export default useApplications;

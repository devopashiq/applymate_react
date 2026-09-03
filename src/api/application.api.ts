import type { ApiResponse } from "../types/api";
import type { CreateJobDto, JobResponse, UpdateJobDto } from "../types/job";
import { api } from "./axios";

export const applicationApi = {
  loadAllApplication() {
    return api.get<ApiResponse<JobResponse[]>>("/api/jobs/");
  },

  createApplication(data: CreateJobDto) {
    return api.post<ApiResponse<JobResponse>>("/api/jobs/", data);
  },

  updateApplication(applicationId: string, data: UpdateJobDto) {
    return api.patch<ApiResponse<JobResponse>>(`/api/jobs/${applicationId}`, data);
  },

  getApplication(applicationId: string) {
    return api.get<ApiResponse<JobResponse>>(`/api/jobs/${applicationId}`);
  },

  deleteApplication(applicationId: string) {
    return api.delete<ApiResponse<null>>(`/api/jobs/${applicationId}`);
  },
};

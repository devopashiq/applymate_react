export const JOB_STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export type JobStatusProps = {
  status: JobStatus;
};

export type CreateJobDto = {
  status: JobStatus;
  company: string;
  position: string;
  description: string;
};

export type UpdateJobDto = Partial<CreateJobDto>;

export type JobFormValues = CreateJobDto;

export interface JobResponse extends CreateJobDto {
  id: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export function isJobStatus(value: string): value is JobStatus {
  return JOB_STATUSES.some((status) => status === value);
}

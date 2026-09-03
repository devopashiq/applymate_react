import type { JobStatus } from "../types/job";

type StatusConfig = Record<JobStatus, { label: string; color: string }>;

export const STATUS_CONFIG = {
  Applied: { label: "Applied", color: "bg-blue-100 text-blue-700" },
  Interview: { label: "Interview", color: "bg-yellow-100 text-yellow-700" },
  Offer: { label: "Offer", color: "bg-green-100 text-green-700" },
  Rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
} as const satisfies StatusConfig;

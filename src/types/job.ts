import type { STATUS_CONFIG } from "../lib/statusConfig";

export type JobStatusProps = {
    status:keyof typeof STATUS_CONFIG
}
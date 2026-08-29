import { STATUS_CONFIG } from "../lib/statusConfig"
import type { JobStatusProps } from "../types/job"


const StatusBadge = ({status}:JobStatusProps) => {
  const config = STATUS_CONFIG[status]
  return (
     <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge

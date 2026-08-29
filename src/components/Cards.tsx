import { EllipsisVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../lib/formatDate";
import { getInitials } from "../lib/getInitials";

export interface JobResponse {
  id: string;
  company: string;
  position: string;
  description: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type CardProps = {
  applications: JobResponse;
};

const Cards = ({ applications }: CardProps) => {
  return (
    <div className="hover:bg-surface-low transition-colors group flex justify-between bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
      <div className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-surface-container-high rounded-xl flex items-center justify-center font-manrope font-bold text-primary group-hover:scale-105 transition-transform">
                  {getInitials(applications.company)}
                </div>

          <div>
            <p className="font-bold text-on-surface">{applications.company}</p>
            <p className="text-xs text-on-surface/50">
              {applications.position}
            </p>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="px-8 py-6">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider `}
          >
            <StatusBadge status={applications.status} />
          </span>
        </div>

        <div className="px-8 py-6 text-center">
          <p className="text-xs text-on-surface/60 font-medium">
            {formatDate(applications.createdAt)}
          </p>
        </div>

        <div className="px-8 py-6 text-right">
          <button className="p-2 hover:bg-surface-container rounded-lg transition-all">
            <EllipsisVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;

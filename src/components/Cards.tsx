import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../lib/formatDate";
import { getInitials } from "../lib/getInitials";
import type { JobResponse } from "../types/job";

type CardProps = {
  app: JobResponse;
  edit: (data: JobResponse) => void;
  remove: (id: string) => void | Promise<void>;
};

const Cards = ({ app, edit, remove }: CardProps) => {
  function handleRemove() {
  
      void remove(app.id);
    
  }

  return (
    <div className="hover:bg-surface-low transition-colors group flex justify-between bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
      <div className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-surface-container-high rounded-xl flex items-center justify-center font-manrope font-bold text-primary group-hover:scale-105 transition-transform">
            {getInitials(app.company)}
          </div>

          <div>
            <p className="font-bold text-on-surface">{app.company}</p>
            <p className="text-xs text-on-surface/50">{app.position}</p>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="px-8 py-6">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider `}
          >
            <StatusBadge status={app.status} />
          </span>
        </div>

        <div className="px-8 py-6 text-center">
          <p className="text-xs text-on-surface/60 font-medium">
            {app.createdAt ? formatDate(app.createdAt) : "Date unavailable"}
          </p>
        </div>

        <div className="px-8 py-6 text-right">
          <button
            type="button"
            className="p-2 hover:bg-surface-container rounded-lg transition-all"
            onClick={() => edit(app)}
            aria-label={`Edit ${app.company}`}
          >
            <Pencil />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-surface-container rounded-lg transition-all"
            onClick={handleRemove}
            aria-label={`Delete ${app.company}`}
          >
            <Trash2 />
          </button>
        </div>
      </div>


    </div>
  );
};

export default Cards;

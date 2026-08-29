import { useEffect, useState } from "react";
import { authService } from "../service/auth.service";

import Cards from "../components/Cards";
import Modal from "../components/Modal";

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

export const sampleJobs: JobResponse[] = [
  {
    id: "1",
    company: "Google",
    position: "Frontend Developer",
    description: "Develop and maintain React-based web applications.",
    status: "Applied",
    userId: "user-101",
    createdAt: "2026-07-20T09:30:00Z",
    updatedAt: "2026-07-20T09:30:00Z",
  },
  {
    id: "2",
    company: "Microsoft",
    position: "Backend Engineer",
    description: "Build scalable APIs using Node.js and Express.",
    status: "Interview",
    userId: "user-101",
    createdAt: "2026-07-18T14:15:00Z",
    updatedAt: "2026-07-25T10:00:00Z",
  },
  {
    id: "3",
    company: "Amazon",
    position: "Full Stack Developer",
    description: "Work on customer-facing applications using React and Java.",
    status: "Offer",
    userId: "user-101",
    createdAt: "2026-07-10T08:45:00Z",
    updatedAt: "2026-07-28T16:20:00Z",
  },
  {
    id: "4",
    company: "Netflix",
    position: "Software Engineer",
    description: "Develop high-performance streaming platform features.",
    status: "Rejected",
    userId: "user-101",
    createdAt: "2026-07-05T11:00:00Z",
    updatedAt: "2026-07-22T13:40:00Z",
  },
  {
    id: "5",
    company: "Spotify",
    position: "React Developer",
    description: "Create and improve music discovery experiences.",
    status: "Applied",
    userId: "user-101",
    createdAt: "2026-07-30T15:10:00Z",
    updatedAt: "2026-07-30T15:10:00Z",
  },
];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLoggedUSer = async () => {
      try {
        const response = await authService.me();
        console.log(response);
      } catch (error) {}
    };

    fetchLoggedUSer();
  }, []);
  return (
    <div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Application
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      <div className="flex flex-col gap-2">
        {sampleJobs.map((app) => (
          <Cards key={app.id} applications={app}></Cards>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

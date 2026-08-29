import { Archive, Briefcase, LayoutDashboard, Settings } from "lucide-react";
import { NavLink } from "react-router";
import NavItem from "./NavItem";

const menuItems = [
  {
    id:1,
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    id:2,
    label: "Applications",
    icon: Briefcase,
    to: "/applications",
  },
];

type SidebarProps = {
  mobileOpen: boolean;
  desktopCollapsed: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({
  desktopCollapsed,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-70 flex-col gap-8 bg-[#161A2E] py-10 pl-6  transform transition-transform duration-300 ease-in-out  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
         md:translate-x-0 overflow-hidden
        ${desktopCollapsed ? "md:w-20" : "md:w-70"}
      
      `}
    >
      {/* Logo */}
      <div className="flex items-center ">
        <div className="flex h-10 w-15 items-center justify-center bg-re ">
          <img
            src="logo-only.png"
            alt="ApplyMate Logo"
            className="w-20 -ml-3"
          />
        </div>

        <h1
          className={`font-manrope text-xl font-bold text-on-primary ${desktopCollapsed ? "md:hidden" : "d-block"}`}
        >
          Apply Mate
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 pr-4">
        {menuItems.map(({ label, icon: Icon, to }) => (
          <NavItem
            icon={Icon}
            label={label}
            to={to}
            desktopCollapsed={desktopCollapsed}
          />
        ))}
      </nav>

      {/* Upgrade Card */}
      <div className="space-y-6 pr-6">
        {/* Profile */}
        <div className="flex items-center gap-3 border-t border-outline-variant/30 py-4">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFTNM5tFRfQirwwqfzrm4y0DKRbjPROQrGQbYCw1QAvmk-3TBfSUIJeikzG_dshTQPD_b07zgXu-2f4xJz6u5wVj1QMzZW31CuQGAc44jRAMCoWfqWgVaegUzZ2-AJnI4RpX2d9k_-E48OZn6Zh9f1p9W5A0m8mGeyEyG5YttyGrVgFK8TwU3sYJeHLq_lMTiLuCxXELb4Fa6lMf8erCqZass_TYVZ12GdHzdq8520t7jm2p1wDlF9L3ujnS-L5-Z0zsF_Ok3i0gg"
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div
            className={`${!desktopCollapsed ? "opacity-100" : "md:opacity-0 md:w-0"}`}
          >
            <p className="text-sm font-bold text-on-primary">Julian Reed</p>

            <p className="text-[10px] uppercase tracking-widest text-blue-300">
              Product Strategy
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-1 pb-6 ">
          <a
            href="#"
            className={`flex items-center gap-4 py-2 text-xs font-bold uppercase tracking-widest text-on-primary transition hover:text-blue-300     `}
          >
            <Settings
              size={18}
              className={`transition-transform group-hover:translate-x-1
                     ${desktopCollapsed ? "shrink-0" : ""}
                    `}
            />
            <span
              className={`font-inter text-sm ${!desktopCollapsed ? "md:inline" : "md:hidden"}`}
            >
              Settings
            </span>
          </a>

          <a
            href="#"
            className={`flex items-center gap-4 py-2 text-xs font-bold uppercase tracking-widest text-on-primary transition hover:text-blue-300  `}
          >
            <Archive
              size={18}
              className={`transition-transform group-hover:translate-x-1
                     ${desktopCollapsed ? "shrink-0" : ""}
                    `}
            />
            <span
              className={`font-inter text-sm ${!desktopCollapsed ? "md:d-inline" : "md:hidden"}`}
            >
              Archive
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}

import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  to: string;
  desktopCollapsed: boolean;
  onClick?: () => void;
};

const NavItem = ({
  label,
  icon: Icon,
  to,
  desktopCollapsed,
  onClick,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-4 py-3 uppercase tracking-widest transition-all duration-200 whitespace-nowrap 
    ${desktopCollapsed ? "rounded-l-full  pl-3" : "rounded-l-full px-4"}
    ${
      isActive
        ? "bg-[#4268B2] text-on-primary shadow-sm font-bold"
        : "text-on-primary hover:text-on-primar"
    }`
      }
    >
      <>
        <Icon
          size={20}
          className={`transition-transform group-hover:translate-x-1
                     ${desktopCollapsed ? "shrink-0" : ""}
                    `}
        />

        <span
          className={`font-inter text-xs ${!desktopCollapsed ? "opacity-100" : "md:opacity-0 md:w-0"}`}
        >
          {label}
        </span>
      </>
    </NavLink>
  );
};

export default NavItem;

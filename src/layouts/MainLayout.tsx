import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// MainLayout.tsx
const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);      // drawer state (mobile)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false); // rail state (desktop)

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        desktopCollapsed={desktopCollapsed}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          desktopCollapsed ? "md:ml-20" : "md:ml-70"
        }`}
      >
        <Header
          onMenuClick={() => setMobileOpen((prev) => !prev)}
          onCollapseClick={() => setDesktopCollapsed((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto pt-4 pl-8 pr-8 pb-12 bg-[#F6F5F1]">
          <Outlet />
        </main>
      </div>

      {/* Backdrop — mobile only */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
};
export default MainLayout;
// Sidebar.tsx
"use client";

import React, { ReactNode, useState } from "react";
import {
  Package as PackageIcon,
  Briefcase,
  Star,
  Building,
  BookOpenText,
  ChevronLeft,
  User,
  LayoutDashboard,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { MenuKey } from "./types";
import { signOut } from "next-auth/react";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  selectedMenu: MenuKey;
  setSelectedMenu: (key: MenuKey) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onToggle,
  selectedMenu,
  setSelectedMenu,
}) => {
  /**
   * Handle user logout
   * Signs out the user and redirects to home page
   */
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      // Silently handle logout errors in production
    }
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 flex flex-col transition-width duration-300 ease-in-out h-screen shadow-sm sticky top-0
            ${open ? "w-64" : "w-16"}`}
    >
      {/* Header with Branding */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          {open && (
            <h1 className="text-xl font-bold text-gray-900">CareerIreland</h1>
          )}
        </div>
        <button
          onClick={onToggle}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronLeft
            className={`w-5 h-5 text-gray-600 transition-transform ${
              open ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Contents Label */}
      {open && (
        <div className="px-4 py-2 mt-4 flex-shrink-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contents</p>
        </div>
      )}

      {/* Scrollable Navigation Area */}
      <nav className="flex flex-col mt-2 space-y-1 flex-1 px-2 overflow-y-auto overflow-x-hidden">
        <SidebarItem
          icon={<LayoutDashboard />}
          label="Dashboard"
          open={open}
          active={selectedMenu === "dashboard"}
          onClick={() => setSelectedMenu("dashboard")}
        />
        <SidebarItem
          icon={<User />}
          label="User"
          open={open}
          active={selectedMenu === "profile"}
          onClick={() => setSelectedMenu("profile")}
        />
        <SidebarItem
          icon={<Briefcase />}
          label="Mentor"
          open={open}
          active={selectedMenu === "services"}
          onClick={() => setSelectedMenu("services")}
        />
        <SidebarItem
          icon={<PackageIcon />}
          label="Our Packages"
          open={open}
          active={selectedMenu === "packages"}
          onClick={() => setSelectedMenu("packages")}
        />
        <SidebarItem
          icon={<Building />}
          label="Immigration Services"
          open={open}
          active={selectedMenu === "immigration"}
          onClick={() => setSelectedMenu("immigration")}
        />
        <SidebarItem
          icon={<BookOpenText />}
          label="Training"
          open={open}
          active={selectedMenu === "training"}
          onClick={() => setSelectedMenu("training")}
        />
        <SidebarItem
          icon={<Star />}
          label="Customer review"
          open={open}
          active={selectedMenu === "reviews"}
          onClick={() => setSelectedMenu("reviews")}
        />
        <SidebarItem
          icon={<MessageCircle />}
          label="Contact Us"
          open={open}
          active={selectedMenu === "contact"}
          onClick={() => setSelectedMenu("contact")}
        />
      </nav>

      {/* Logout Button at Bottom - Fixed at bottom */}
      <div className="mt-auto p-4 border-t border-gray-200 flex-shrink-0">
        <SidebarItem
          icon={<LogOut />}
          label="Logout"
          open={open}
          active={false}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  open: boolean;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  open,
  active = false,
  onClick,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center px-3 py-2 cursor-pointer rounded-lg select-none transition-colors duration-200
        ${
          active
            ? "bg-gray-100 text-gray-900 font-medium"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={!open ? label : undefined}
    >
      <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      {open ? (
        <span className="ml-3 text-sm">{label}</span>
      ) : (
        hover && (
          <div className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white shadow-lg z-50 select-none">
            {label}
          </div>
        )
      )}
    </div>
  );
};

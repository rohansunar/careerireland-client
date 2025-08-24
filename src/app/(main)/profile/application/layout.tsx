"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "../components/Sidebar";
import { MenuKey } from "../components/types";

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

/**
 * Application Layout Component
 *
 * Provides layout structure for application-related pages with conditional sidebar visibility.
 * Hides the sidebar when viewing individual applications to prevent user confusion from
 * non-responsive menu items, while maintaining sidebar on application list pages.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - React components to render within the layout
 * @return {JSX.Element} The application layout component
 */
const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // Start closed on mobile
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("immigration");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're viewing a single application (has caseId in path)
  // Path structure: /profile/application/[caseId] = 4 segments (including empty first segment)
  const isSingleApplicationView = pathname.includes('/profile/application/') &&
    pathname.split('/').length >= 4 && pathname.split('/')[3] !== '';

  /**
   * Handle responsive behavior for sidebar visibility
   * Auto-opens sidebar on desktop, keeps closed on mobile by default
   */
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); // Auto-open on desktop
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /**
   * Close sidebar when clicking outside on mobile devices
   * Improves mobile user experience by allowing easy dismissal
   */
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Overlay - Only show if not single application view */}
      {!isSingleApplicationView && isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleOverlayClick}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar - Hide completely on single application view */}
      {!isSingleApplicationView && (
        <div
          className={`${isMobile ? "fixed z-50" : "relative"} ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"} transition-transform duration-300 ease-in-out`}
        >
          <Sidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Mobile Header - Only show if not single application view */}
        {!isSingleApplicationView && isMobile && (
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              aria-label="Open navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="font-medium">Menu</span>
            </button>
          </div>
        )}

        {children}
      </main>
    </div>
  );
};

export default ApplicationLayout;

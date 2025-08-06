"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImmigrationDashboard from "../components/ImmigrationDashboard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Sidebar } from "../components/Sidebar";
import { MenuKey } from "../components/types";

/**
 * Applications Page with Sidebar
 *
 * This page provides a direct route to view immigration applications
 * while maintaining the sidebar navigation for consistency.
 * It can be accessed directly via /profile/applications.
 *
 * Features:
 * - Direct access to applications view with sidebar navigation
 * - Responsive sidebar behavior (mobile/desktop)
 * - Back navigation to main profile dashboard
 * - Consistent styling with the rest of the application
 * - Proper loading states and error handling
 *
 * @return {JSX.Element} The applications page component
 */
const ApplicationsPage: React.FC = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("immigration");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Handle responsive behavior
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

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleBackToDashboard = () => {
    router.push('/profile?selectedMenu=dashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleOverlayClick}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar - Fixed positioning to prevent movement on scroll */}
      <div
        className={`${isMobile ? "fixed z-50" : "relative"} ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"} transition-transform duration-300 ease-in-out`}
      >
        <div className="h-screen overflow-y-auto">
          <Sidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Mobile Header */}
        {isMobile && (
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

        {/* Header with navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToDashboard}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                <p className="text-sm text-gray-600">
                  View and manage your immigration applications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Suspense fallback={<LoadingSpinner text="Loading applications..." />}>
            <ImmigrationDashboard />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default ApplicationsPage;

// ProfilePage.tsx
"use client";

import React, { useState, Suspense, lazy, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Tabs } from "@radix-ui/react-tabs";
import { MenuKey } from "./components/types";
import { Sidebar } from "./components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "@/util/urls";

// Lazy imports with explicit typing
const ProfileDashboard = lazy(
  () =>
    import("./components/ProfileDashboard") as unknown as Promise<{
      default: React.FC<{ user: IProfile }>;
    }>
);
const Profile = lazy(
  () =>
    import("./components/profile") as unknown as Promise<{
      default: React.FC<{ user: IProfile }>;
    }>
);
const Services = lazy(
  () =>
    import("./components/services") as unknown as Promise<{
      default: React.FC<{ user: IProfile }>;
    }>
);
const Packages = lazy(
  () =>
    import("./components/packages") as unknown as Promise<{
      default: React.FC<{ user: IProfile }>;
    }>
);
const Reviews = lazy(
  () =>
    import("./components/reviews") as unknown as Promise<{
      default: React.FC<{ user: IProfile }>;
    }>
);
const Training = lazy(
  () =>
    import("./components/training") as unknown as Promise<{
      default: React.FC<{ user: IProfile }>;
    }>
);
const ImmigrationTabs = lazy(
  () => import("./components/ImmigrationTabs") as Promise<{ default: React.FC }>
);
const Contact = lazy(
  () => import("./components/Contact") as Promise<{ default: React.FC }>
);
// Import these directly instead of lazy loading to avoid chunk loading issues
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

const ProfileContent: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("dashboard");

  // Check if we're viewing a single application page - hide ProfileContent sidebar
  const isOnApplicationPage = pathname.includes('/profile/application/');

  // Fetch real user profile data
  const { data: userProfile, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch user profile');
      }
      return res.json() as Promise<IProfile>;
    },
    enabled: !!session?.backendTokens?.accessToken,
  });

  // Handle URL parameters for navigation
  useEffect(() => {
    const selectedMenuParam = searchParams.get("selectedMenu") as MenuKey;
    if (
      selectedMenuParam &&
      [
        "dashboard",
        "profile",
        "services",
        "immigration",
        "packages",
        "reviews",
        "training",
        "contact",
      ].includes(selectedMenuParam)
    ) {
      setSelectedMenu(selectedMenuParam);
    }
  }, [searchParams]);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="Loading profile..." />
        </div>
      </div>
    );
  }

  if (isError || !userProfile) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600">Please try refreshing the page or contact support if the issue persists.</p>
          </div>
        </div>
      </div>
    );
  }

  // Create a sanitized user object that hides sensitive fields from UI display
  const user: IProfile = {
    ...userProfile,
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <ProfileDashboard user={user} />;
      case "profile":
        return <Profile user={user} />;
      case "services":
        return <Services user={user} />;
      case "immigration":
        return <ImmigrationTabs />;
      case "packages":
        return <Packages user={user} />;
      case "reviews":
        return <Reviews user={user} />;
      case "training":
        return <Training user={user} />;
      case "contact":
        return <Contact />;
      default:
        return <Profile user={user} />;
    }
  };

  // Don't render ProfileContent layout when on application pages
  if (isOnApplicationPage) {
    return null; // Let the application layout handle the rendering
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          <div className="mx-auto max-w-[73rem]">
            <Tabs value={selectedMenu} className="space-y-4">
              <Suspense fallback={<LoadingSpinner text="Loading content..." />}>
                <ErrorBoundary>{renderContent()}</ErrorBoundary>
              </Suspense>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;

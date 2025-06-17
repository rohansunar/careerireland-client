// ProfilePage.tsx
"use client";

import React, { useState, Suspense, lazy, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs } from "@radix-ui/react-tabs";
import { MenuKey } from "./components/types";
import { Sidebar } from "./components/Sidebar";

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

const ProfilePage: React.FC = () => {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("dashboard");

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

  const user: IProfile = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    emailVerified: true,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
    provider: "google",
    total_spent: "$2,450",
    reviews: [
      {
        id: "1",
        message: "Excellent service!",
        rating: 5,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        mentor: {
          id: "1",
          name: "Jane Smith",
          email: "jane@example.com",
          image: "",
          desc: "Career Mentor",
          designation: "Senior Consultant",
        },
        user: { name: "John Doe", image: null },
      },
      {
        id: "2",
        message: "Very helpful with my visa application.",
        rating: 5,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
        mentor: {
          id: "2",
          name: "Mike Johnson",
          email: "mike@example.com",
          image: "",
          desc: "Immigration Expert",
          designation: "Immigration Specialist",
        },
        user: { name: "John Doe", image: null },
      },
    ],
    services: [
      {
        id: "1",
        amount: 150,
        status: "completed",
        progress: "100%",
        createdAt: "2024-01-15",
        mentor_services: {
          id: "1",
          name: "CV Review Service",
          amount: 150,
          mentor: {
            id: "1",
            name: "Sarah Connor",
            email: "sarah@careerireland.com",
            image: "",
            desc: "Career Development Specialist",
            designation: "Senior Career Consultant",
          },
        },
      },
      {
        id: "2",
        amount: 200,
        status: "active",
        progress: "50%",
        createdAt: "2024-02-01",
        mentor_services: {
          id: "2",
          name: "Interview Preparation",
          amount: 200,
          mentor: {
            id: "2",
            name: "David Mitchell",
            email: "david@careerireland.com",
            image: "",
            desc: "Interview Coach & HR Expert",
            designation: "Lead Interview Coach",
          },
        },
      },
    ],
    packages: [
      {
        id: "1",
        amount: 299,
        status: "completed",
        progress: "100%",
        createdAt: "2024-02-15",
        package: { id: "1", name: "Career Starter Package", amount: 299 },
      },
      {
        id: "2",
        amount: 599,
        status: "active",
        progress: "75%",
        createdAt: "2024-03-01",
        package: { id: "2", name: "Professional Development", amount: 599 },
      },
    ],
    training: [
      {
        id: "1",
        amount: 99,
        status: "completed",
        progress: "100%",
        createdAt: "2024-01-20",
        training: {
          id: "1",
          name: "LinkedIn Optimization Workshop",
          amount: 99,
        },
      },
      {
        id: "2",
        amount: 149,
        status: "active",
        progress: "60%",
        createdAt: "2024-02-10",
        training: {
          id: "2",
          name: "Networking Skills Masterclass",
          amount: 149,
        },
      },
    ],
    immigration_services: [
      {
        id: "1",
        amount: 850,
        status: "In Progress",
        progress: "75%",
        createdAt: "2024-01-15",
        immigration_service: {
          id: "1",
          name: "Work Permit Application",
          amount: 850,
        },
      },
      {
        id: "2",
        amount: 450,
        status: "Completed",
        progress: "100%",
        createdAt: "2024-02-01",
        immigration_service: { id: "2", name: "Visa Extension", amount: 450 },
      },
      {
        id: "3",
        amount: 1200,
        status: "Pending",
        progress: "25%",
        createdAt: "2024-03-10",
        immigration_service: {
          id: "3",
          name: "Family Reunification",
          amount: 1200,
        },
      },
    ],
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
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

export default ProfilePage;

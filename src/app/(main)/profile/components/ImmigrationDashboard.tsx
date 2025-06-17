"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useImmApplication } from "@/hooks/use-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  AlertTriangle,
  Upload,
  Bell,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Users,
} from "lucide-react";
import CasesTable from "./CasesTable";

// Dashboard summary box component
const DashboardBox = ({
  title,
  value,
  description,
  bgColor = "bg-white",
  icon,
  trend,
}: {
  title: string;
  value: number | string;
  description?: string;
  bgColor?: string;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}) => (
  <div
    className={`flex items-center justify-between p-6 rounded-lg shadow-md border ${bgColor} hover:shadow-lg transition-shadow`}
  >
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        {icon && <div className="text-gray-600">{icon}</div>}
        <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wide">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          <span
            className={`text-xs font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  </div>
);

// Static notifications
const notifications = [
  {
    id: "N001",
    type: "urgent",
    title: "Document Required",
    message: "Missing passport copy for Case C001",
    caseId: "C001",
    daysLeft: 3,
  },
  {
    id: "N002",
    type: "reminder",
    title: "Interview Scheduled",
    message: "Interview for Case C004 on May 20th",
    caseId: "C004",
    daysLeft: 7,
  },
  {
    id: "N003",
    type: "success",
    title: "Application Approved",
    message: "Case C002 has been approved",
    caseId: "C002",
    daysLeft: 0,
  },
];

// Quick action buttons
const QuickActions: React.FC = () => {
  const router = useRouter();

  const handleStartNewApplication = () => {
    router.push("/profile/application/new");
  };

  return (
    <div className="bg-white rounded-lg shadow-md border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600" />
        Quick Actions
      </h3>
      <div className="space-y-3">
        <Button
          className="w-full justify-start gap-3 h-12 bg-blue-600 hover:bg-blue-700"
          size="lg"
          onClick={handleStartNewApplication}
        >
          <Plus className="w-5 h-5" />
          Start New Application
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 h-12" size="lg">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          View Flagged Items
          <Badge variant="destructive" className="ml-auto">
            3
          </Badge>
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 h-12" size="lg">
          <Upload className="w-5 h-5 text-green-500" />
          Upload Documents
        </Button>
      </div>
    </div>
  );
};

// Notifications panel component
const NotificationsPanel: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md border p-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Bell className="w-5 h-5 text-blue-600" />
      Recent Notifications
    </h3>
    <div className="space-y-3">
      {notifications.slice(0, 3).map((notification) => (
        <div
          key={notification.id}
          className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div
            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
              notification.type === "urgent"
                ? "bg-red-500"
                : notification.type === "reminder"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-900">{notification.title}</p>
            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
            {notification.daysLeft > 0 && (
              <p className="text-xs text-orange-600 mt-1 font-medium">
                {notification.daysLeft} days remaining
              </p>
            )}
          </div>
        </div>
      ))}
      <Button variant="ghost" className="w-full text-sm">
        View All Notifications
      </Button>
    </div>
  </div>
);

// Constants
const ITEMS_PER_PAGE = 5;

// Main dashboard component
const ImmigrationDashboard: React.FC = () => {
  const { data, isLoading, isError } = useImmApplication();
  const sampleCases = data?.data || [];

  const inReviewCases = sampleCases.filter((c: { status: string }) => c.status === "In Review").length;
  const approvedCases = sampleCases.filter((c: { status: string }) => c.status === "Approved").length;
  const submittedCases = sampleCases.filter((c: { status: string }) => c.status === "Submitted").length;
  const rejectedCases = sampleCases.filter((c: { status: string }) => c.status === "Rejected").length;
  const totalCases = sampleCases.length;

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-6 bg-gray-50 rounded-md min-h-[600px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Immigration Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage your immigration applications and track progress</p>
        </div>
        <Badge variant="outline" className="text-xs">
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <DashboardBox
          title="In Review"
          value={inReviewCases}
          description="Currently being processed"
          bgColor="bg-yellow-50 border-yellow-200"
          icon={<Clock className="w-5 h-5" />}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardBox
          title="Approved"
          value={approvedCases}
          description="Successfully approved"
          bgColor="bg-green-50 border-green-200"
          icon={<CheckCircle className="w-5 h-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardBox
          title="Submitted"
          value={submittedCases}
          description="Awaiting initial review"
          bgColor="bg-blue-50 border-blue-200"
          icon={<FileText className="w-5 h-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardBox
          title="Rejected"
          value={rejectedCases}
          description="Require attention"
          bgColor="bg-red-50 border-red-200"
          icon={<XCircle className="w-5 h-5" />}
          trend={{ value: -2, isPositive: false }}
        />
        <DashboardBox
          title="Total Cases"
          value={totalCases}
          description="All applications"
          bgColor="bg-purple-50 border-purple-200"
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Actions and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions />
        <div className="lg:col-span-2">
          <NotificationsPanel />
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-lg shadow-md border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track the status and progress of your immigration applications
          </p>
        </div>
        <CasesTable
          cases={sampleCases}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ImmigrationDashboard;

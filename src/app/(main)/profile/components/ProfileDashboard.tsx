"use client";

import React from "react";
import {
  FileText,
} from "lucide-react";
import { useImmApplication } from "@/hooks/use-query";
// Using global IProfile interface

interface DashboardBoxProps {
  title: string;
  value: number | string;
  description?: string;
  bgColor?: string;
  icon?: React.ReactNode;
}

const DashboardBox: React.FC<DashboardBoxProps> = ({
  title,
  value,
  description,
  bgColor = "bg-white",
  icon,
}) => (
  <div className={`p-6 rounded-lg shadow-sm border border-gray-100 ${bgColor}`}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-gray-600 font-medium text-sm mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {description && (
          <p className="text-gray-500 text-xs mt-1">{description}</p>
        )}
      </div>
      {icon && (
        <div className="flex-shrink-0 ml-4">
          <div className="w-10 h-10 text-gray-400">
            {icon}
          </div>
        </div>
      )}
    </div>
  </div>
);

interface ProfileDashboardProps {
  user: IProfile;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ user }) => {
  // Fetch applications data to get the count
  const { data: applicationsData } = useImmApplication();
  const totalApplications = applicationsData?.data?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>Dashboard</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button type="button" className="p-2 text-gray-400 hover:text-gray-600" title="Settings">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-md">
        <DashboardBox
          title="Total Applications"
          value={totalApplications}
          description="Immigration applications submitted"
          icon={<FileText className="w-6 h-6" />}
        />
      </div>




    </div>
  );
};

export default ProfileDashboard;

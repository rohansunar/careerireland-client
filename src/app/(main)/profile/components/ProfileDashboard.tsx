"use client";

import React from "react";
import {
  FileText,
} from "lucide-react";
import { useImmApplication } from "@/hooks/use-query";
import { useRouter } from "next/navigation";
// Using global IProfile interface

interface DashboardBoxProps {
  title: string;
  value: number | string;
  description?: string;
  bgColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

const DashboardBox: React.FC<DashboardBoxProps> = ({
  title,
  value,
  description,
  bgColor = "bg-white",
  icon,
  onClick,
  clickable = false,
}) => {
  const baseClasses = `p-6 rounded-lg shadow-sm border border-gray-100 ${bgColor}`;
  const clickableClasses = clickable
    ? "cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 hover:scale-105"
    : "";

  return (
    <div
      className={`${baseClasses} ${clickableClasses}`}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`font-medium text-sm mb-1 ${clickable ? 'text-blue-600' : 'text-gray-600'}`}>
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-gray-500 text-xs mt-1">{description}</p>
          )}
          {clickable && (
            <p className="text-blue-500 text-xs mt-2 font-medium">Click to view services →</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className={`w-10 h-10 ${clickable ? 'text-blue-500' : 'text-gray-400'}`}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProfileDashboardProps {
  user: IProfile;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ user: _user }) => {
  const router = useRouter();

  // Fetch applications data to get the count
  const { data: applicationsData } = useImmApplication();
  const totalApplications = applicationsData?.data?.length || 0;

  /**
   * Handle navigation to Applications page
   *
   * This function navigates users directly to their applications view
   * where they can see all their immigration applications and their status.
   * Triggered when user clicks on the Total Applications dashboard box.
   */
  const handleNavigateToApplications = () => {
    router.push('/profile/applications');
  };

  /**
   * Handle navigation to Immigration Services page
   *
   * This function navigates users to the main immigration services page
   * where they can view available immigration packages and services.
   * Currently unused but kept for future Quick Actions expansion.
   */
  // const handleNavigateToServices = () => {
  //   router.push('/visa-service');
  // };

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
          onClick={handleNavigateToApplications}
          clickable={true}
        />
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleNavigateToApplications}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">View Applications</div>
              <div className="text-sm text-gray-600">Check status and progress</div>
            </div>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileDashboard;

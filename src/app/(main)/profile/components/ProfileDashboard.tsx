"use client";

import React from "react";
import {
  FileText,
  Users,
  BookOpen,
  Package,
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

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ user }) => {
  const router = useRouter();

  // Fetch applications data to get the count
  const { data: applicationsData } = useImmApplication();
  const totalApplications = applicationsData?.data?.length || 0;

  /**
   * Calculate total spending from user data
   * @return {string} Formatted total spending amount
   */
  const getTotalSpending = () => {
    return parseFloat(user.total_spent || '0').toFixed(2);
  };

  /**
   * Get unique mentor count from services
   * @return {number} Number of unique mentors
   */
  const getUniqueMentorCount = () => {
    const mentorIds = new Set();
    user.services.forEach(service => {
      if (service.mentor_services?.mentor?.id) {
        mentorIds.add(service.mentor_services.mentor.id);
      }
    });
    return mentorIds.size;
  };



  /**
   * Handle navigation to Services page
   */
  const handleNavigateToServices = () => {
    router.push('/profile?tab=services');
  };

  /**
   * Handle navigation to Packages page
   */
  const handleNavigateToPackages = () => {
    router.push('/profile?tab=packages');
  };

  /**
   * Handle navigation to Training page
   */
  const handleNavigateToTraining = () => {
    router.push('/profile?tab=training');
  };

  /**
   * Handle navigation to Immigration Services page
   *
   * This function navigates users to the immigration services tab
   * where they can view their applications and available services.
   */
  const handleNavigateToImmigrationServices = () => {
    router.push('/profile?selectedMenu=immigration');
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardBox
          title="Total Spending"
          value={`€${getTotalSpending()}`}
          description="Total amount spent on services"
          bgColor="bg-gradient-to-r from-green-50 to-green-100"
        />
        <DashboardBox
          title="Mentors"
          value={getUniqueMentorCount()}
          description="Unique mentors worked with"
          icon={<Users className="w-6 h-6" />}
          onClick={handleNavigateToServices}
          // clickable={getUniqueMentorCount() > 0}
          bgColor="bg-gradient-to-r from-blue-50 to-blue-100"
        />
        <DashboardBox
          title="Training Programs"
          value={user.training.length}
          description="Training programs enrolled"
          icon={<BookOpen className="w-6 h-6" />}
          onClick={handleNavigateToTraining}
          // clickable={user.training.length > 0}
          bgColor="bg-gradient-to-r from-purple-50 to-purple-100"
        />
        <DashboardBox
          title="Packages"
          value={user.packages.length}
          description="Packages purchased"
          icon={<Package className="w-6 h-6" />}
          onClick={handleNavigateToPackages}
          // clickable={user.packages.length > 0}
          bgColor="bg-gradient-to-r from-orange-50 to-orange-100"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardBox
          title="Immigration Applications"
          value={totalApplications}
          description="Immigration applications submitted"
          icon={<FileText className="w-6 h-6" />}
          onClick={handleNavigateToImmigrationServices}
          clickable={true}
          bgColor="bg-gradient-to-r from-indigo-50 to-indigo-100"
        />
        {/* <DashboardBox
          title="Reviews Written"
          value={user.reviews.length}
          description="Reviews for mentors"
          icon={<Star className="w-6 h-6" />}
          bgColor="bg-gradient-to-r from-yellow-50 to-yellow-100"
        /> */}
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

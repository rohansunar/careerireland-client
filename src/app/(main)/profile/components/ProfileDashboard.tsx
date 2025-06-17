"use client";

import React from "react";
import {
  DollarSign,
  Briefcase,
  User,
} from "lucide-react";
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
  // Calculate case statistics from immigration services
  const immigrationCases = user.immigration_services || [];
  const totalCases = immigrationCases.length;

  // Calculate service statistics
  const totalServices = user.services?.length || 0;

  // Parse total spending (remove currency symbol and convert to number for display)
  const totalSpent = user.total_spent || "$0";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardBox
          title="Total Users"
          value={totalCases || 29}
          icon={<User className="w-6 h-6" />}
        />
        <DashboardBox
          title="Total Mentors"
          value={totalServices || 42}
          icon={<Briefcase className="w-6 h-6" />}
        />
        <DashboardBox
          title="Total Revenue"
          value={totalSpent || "€26,618.00"}
          icon={<DollarSign className="w-6 h-6" />}
        />
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Revenue Breakdown
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Distribution of revenue across different services
          </p>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              {/* Donut Chart Placeholder */}
              <div className="w-full h-full rounded-full border-[20px] border-gray-200 relative">
                <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-t-purple-500 border-r-orange-500 border-b-green-500 border-l-blue-500 transform rotate-45"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Mentor Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Packages</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Immigration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Training</span>
            </div>
          </div>
        </div>

        {/* Top Rated Mentors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Top Rated Mentors
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Mentors with highest ratings and revenue
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-orange-600">S</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sayali Sudesh Randive</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-500">5 (1 reviews)</span>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-gray-900">€0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">K</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Kantalika Verishetty</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-500">5 (1 reviews)</span>
                  </div>
                </div>
              </div>
              <span className="font-semibold text-gray-900">€0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Users and Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Users */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Latest Users
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Recently registered users
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Joined</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-t border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-orange-600">S</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Sinu</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">sinupoojari88@gmail.com</td>
                  <td className="py-3 text-sm text-gray-500">May 27, 2025</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">D</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Da Nil</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">brahymalarsavy3@gmail.com</td>
                  <td className="py-3 text-sm text-gray-500">May 24, 2025</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-600">V</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Vikash</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">123117723@mail.ucc.ie</td>
                  <td className="py-3 text-sm text-gray-500">May 22, 2025</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-600">M</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Manav Modi</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">modimanav2002@gmail.com</td>
                  <td className="py-3 text-sm text-gray-500">May 14, 2025</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-indigo-600">M</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Musaib Khan</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-600">khanmusaib01@gmail.com</td>
                  <td className="py-3 text-sm text-gray-500">May 13, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Recent Enquiries
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Latest contact form submissions
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Josna Sara Varghese</p>
                <p className="text-xs text-gray-500 truncate">josnabrotherfont@gmail.com</p>
                <p className="text-xs text-gray-400 mt-1">May 31, 2025</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Bhavya Shukla</p>
                <p className="text-xs text-gray-500 truncate">bhavyashukla56@gmail.com</p>
                <p className="text-xs text-gray-400 mt-1">May 29, 2025</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Neha</p>
                <p className="text-xs text-gray-500 truncate">nehawaisekar@gmail.com</p>
                <p className="text-xs text-gray-400 mt-1">May 27, 2025</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Paul Dinesh Augustine</p>
                <p className="text-xs text-gray-500 truncate">pauldinesh2008@gmail.com</p>
                <p className="text-xs text-gray-400 mt-1">May 26, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;

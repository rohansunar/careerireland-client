"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CaseWorkflowManager from "@/components/immigration/CaseWorkflowManager";
import { CaseFormData } from "@/components/immigration/types/workflow.types";

const NewApplicationPage: React.FC = () => {
  const router = useRouter();

  const handleSave = async (data: CaseFormData) => {
    try {
      // TODO: Implement save to backend
      // Save case data to backend

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      alert('Application saved successfully!');
    } catch (error) {
      // Handle save error
      alert('Failed to save application. Please try again.');
    }
  };

  const handleSubmit = async (data: CaseFormData) => {
    try {
      // TODO: Implement submit to backend
      // Submit case data to backend

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message and redirect
      alert('Application submitted successfully!');
      router.push('/profile/application');
    } catch (error) {
      // Handle submit error
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push('/profile/application');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CaseWorkflowManager
        mode="create"
        onSave={handleSave}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default NewApplicationPage;

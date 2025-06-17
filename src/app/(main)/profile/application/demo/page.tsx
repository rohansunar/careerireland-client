"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Users, 
  Send,
  Clock,
  MessageSquare,
  Star
} from "lucide-react";

import CaseWorkflowManager from "@/components/immigration/CaseWorkflowManager";
import { CaseFormData } from "@/components/immigration/types/workflow.types";

const DemoPage: React.FC = () => {
  const router = useRouter();

  const handleSave = async (data: CaseFormData) => {
    console.log('Demo: Saving case data:', data);
    alert('Demo: Application saved successfully!');
  };

  const handleSubmit = async (data: CaseFormData) => {
    console.log('Demo: Submitting case data:', data);
    alert('Demo: Application submitted successfully!');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                🚀 Case Workflow Manager Demo
              </h1>
              <p className="text-blue-100 text-lg">
                Experience the new 12-step immigration workflow with integrated checklist functionality
              </p>
            </div>
            <Badge variant="secondary" className="bg-white text-blue-800 text-sm px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              Live Demo
            </Badge>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <FileText size={20} />
                Creation Phase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700 mb-3">
                5-step application creation with real-time validation and checklist integration
              </p>
              <div className="space-y-1 text-xs text-blue-600">
                <div>✓ Personal Information Form</div>
                <div>✓ Visa Details & Passport Info</div>
                <div>✓ Document Upload with Validation</div>
                <div>✓ Priority-based Checklist (4 levels)</div>
                <div>✓ Review & Submit</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <Users size={20} />
                Processing Phase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700 mb-3">
                Professional review and consultation services with specialist assignment
              </p>
              <div className="space-y-1 text-xs text-purple-600">
                <div>✓ Onboarding & Case Assignment</div>
                <div>✓ Checkpoint Call Scheduling</div>
                <div>✓ Expert Document Review</div>
                <div>✓ Feedback & Recommendations</div>
                <div>✓ Status Tracking</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CheckCircle size={20} />
                Decision Phase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700 mb-3">
                Complete workflow from submission to final decision with appeal options
              </p>
              <div className="space-y-1 text-xs text-green-600">
                <div>✓ Application Filing & Submission</div>
                <div>✓ Timeline Tracking</div>
                <div>✓ Query Management</div>
                <div>✓ Decision Notification</div>
                <div>✓ Appeal Process (if needed)</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <Star size={20} />
              Key Features Demonstrated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-yellow-900">Design System Integration</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• gorgonzolaBlue (#404BD0) color scheme</li>
                  <li>• Consistent UI components (Button, Badge, Card)</li>
                  <li>• Responsive grid layout system</li>
                  <li>• React Hook Form + Zod validation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-yellow-900">Advanced Functionality</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 4-priority checklist system (CRITICAL/RECOMMENDED/OPTIONAL/ENHANCEMENT)</li>
                  <li>• Progressive disclosure for 12+ workflow steps</li>
                  <li>• Phase-based navigation with status tracking</li>
                  <li>• Real-time validation and progress indicators</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Demo Component */}
      <CaseWorkflowManager
        mode="create"
        onSave={handleSave}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      {/* Demo Footer */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Implementation Complete</h3>
          <p className="text-gray-300 mb-4">
            This demo showcases the fully integrated 12-step immigration workflow with checklist functionality,
            maintaining 100% compatibility with the existing design system and codebase.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="bg-white text-gray-800 hover:bg-gray-100"
              onClick={() => router.push('/profile')}
            >
              Back to Dashboard
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/profile/application/new')}
            >
              Try Live Version
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;

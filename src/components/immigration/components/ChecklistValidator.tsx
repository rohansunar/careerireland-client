"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Circle,
  AlertTriangle,
  Info,
  FileText,
  Upload,
  Eye
} from "lucide-react";

import { 
  CaseFormData, 
  ChecklistProgress,
  ChecklistItem,
  Priority
} from "../types/workflow.types";

interface ChecklistValidatorProps {
  formData: Partial<CaseFormData>;
  visaType: string;
  currentStep: number;
  checklistProgress: ChecklistProgress;
  onChecklistUpdate: (progress: ChecklistProgress) => void;
  mode: 'validation' | 'display';
}

const ChecklistValidator: React.FC<ChecklistValidatorProps> = ({
  formData,
  visaType,
  currentStep,
  checklistProgress,
  onChecklistUpdate,
  mode
}) => {
  // Priority configuration
  const priorityConfig = {
    CRITICAL: {
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "🔴",
      weight: 4,
      description: "Must have - automatic rejection if missing"
    },
    RECOMMENDED: {
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: "🟡",
      weight: 3,
      description: "Strongly recommended - improves approval chances"
    },
    OPTIONAL: {
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "🔵",
      weight: 2,
      description: "Scenario-specific - may be required"
    },
    ENHANCEMENT: {
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: "🟢",
      weight: 1,
      description: "Additional supporting documents"
    }
  };

  // Filter checklist items relevant to current step
  const getRelevantItems = (priority: Priority): ChecklistItem[] => {
    const items = checklistProgress[priority.toLowerCase() as keyof ChecklistProgress] as ChecklistItem[];
    
    // Show all items for document upload step (step 4) and review step (step 5)
    if (currentStep >= 4) {
      return items;
    }
    
    // For earlier steps, show only items that can be prepared
    return items.filter(item => {
      // Show passport-related items for personal info step
      if (currentStep === 1 && item.documentType === 'Identity Document') return true;
      // Show employment-related items for visa details step
      if (currentStep === 2 && item.documentType === 'Employment Document') return true;
      // Show financial items for additional info step
      if (currentStep === 3 && item.documentType === 'Financial Document') return true;
      return false;
    });
  };

  // Calculate completion statistics
  const completionStats = useMemo(() => {
    const allItems = [
      ...checklistProgress.critical,
      ...checklistProgress.recommended,
      ...checklistProgress.optional,
      ...checklistProgress.enhancement
    ];
    
    const completed = allItems.filter(item => item.status === 'completed').length;
    const total = allItems.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const criticalCompleted = checklistProgress.critical.filter(item => item.status === 'completed').length;
    const criticalTotal = checklistProgress.critical.length;
    const criticalPercentage = criticalTotal > 0 ? Math.round((criticalCompleted / criticalTotal) * 100) : 0;
    
    return {
      completed,
      total,
      percentage,
      criticalCompleted,
      criticalTotal,
      criticalPercentage,
      canProceed: criticalCompleted === criticalTotal
    };
  }, [checklistProgress]);

  const handleItemToggle = (itemId: string, priority: Priority) => {
    const priorityKey = priority.toLowerCase() as keyof ChecklistProgress;
    const items = checklistProgress[priorityKey] as ChecklistItem[];
    
    const updatedItems = items.map(item => 
      item.id === itemId 
        ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' }
        : item
    );
    
    const updatedProgress = {
      ...checklistProgress,
      [priorityKey]: updatedItems
    };
    
    // Recalculate completion percentage
    const allItems = [
      ...updatedProgress.critical,
      ...updatedProgress.recommended,
      ...updatedProgress.optional,
      ...updatedProgress.enhancement
    ];
    const completed = allItems.filter(item => item.status === 'completed').length;
    updatedProgress.completionPercentage = Math.round((completed / allItems.length) * 100);
    
    onChecklistUpdate(updatedProgress);
  };

  const renderChecklistSection = (priority: Priority) => {
    const config = priorityConfig[priority];
    const items = getRelevantItems(priority);
    
    if (items.length === 0) return null;
    
    const completedItems = items.filter(item => item.status === 'completed').length;
    const sectionProgress = Math.round((completedItems / items.length) * 100);
    
    return (
      <div key={priority} className={`border rounded-lg ${config.borderColor} ${config.bgColor}`}>
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-medium ${config.color} flex items-center gap-2`}>
              <span>{config.icon}</span>
              {priority}
              <Badge variant="outline" className="text-xs">
                {completedItems}/{items.length}
              </Badge>
            </h4>
            <span className={`text-sm font-medium ${config.color}`}>
              {sectionProgress}%
            </span>
          </div>
          <Progress value={sectionProgress} className="h-2" />
          <p className="text-xs text-gray-600 mt-1">{config.description}</p>
        </div>
        
        <div className="p-3 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-2 rounded border transition-all duration-200 ${
                item.status === 'completed' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => handleItemToggle(item.id, priority)}
                className="mt-0.5 flex-shrink-0"
                disabled={mode === 'display'}
              >
                {item.status === 'completed' ? (
                  <CheckCircle size={16} className="text-green-600" />
                ) : (
                  <Circle size={16} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className={`text-sm font-medium ${
                    item.status === 'completed' ? 'text-green-900 line-through' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h5>
                  <div className="flex items-center gap-1">
                    {item.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                    {item.conditional && (
                      <Badge variant="outline" className="text-xs">
                        Conditional
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                
                {item.specifications && (
                  <div className="text-xs text-gray-500 space-y-1">
                    {item.specifications.acceptedFormats && (
                      <div>
                        <span className="font-medium">Formats:</span> {item.specifications.acceptedFormats.join(', ')}
                      </div>
                    )}
                    {item.specifications.maxSize && (
                      <div>
                        <span className="font-medium">Max size:</span> {item.specifications.maxSize}
                      </div>
                    )}
                    {item.specifications.notes && (
                      <div>
                        <span className="font-medium">Note:</span> {item.specifications.notes}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    <Upload size={12} className="mr-1" />
                    Upload
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 text-xs">
                    <Eye size={12} className="mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText size={18} />
            Document Checklist
          </span>
          <Badge variant="outline" className="text-xs">
            Step {currentStep}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">
              {completionStats.percentage}%
            </span>
          </div>
          <Progress value={completionStats.percentage} className="h-2 mb-2" />
          <div className="text-xs text-gray-600">
            {completionStats.completed} of {completionStats.total} items completed
          </div>
        </div>

        {/* Critical Items Alert */}
        {!completionStats.canProceed && currentStep >= 4 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-600" />
              <span className="text-sm font-medium text-red-900">Action Required</span>
            </div>
            <p className="text-xs text-red-800">
              {checklistProgress.critical.length - completionStats.criticalCompleted} critical item(s) 
              must be completed before proceeding.
            </p>
          </div>
        )}

        {/* Checklist Sections */}
        <div className="space-y-3">
          {(['CRITICAL', 'RECOMMENDED', 'OPTIONAL', 'ENHANCEMENT'] as Priority[]).map(priority => 
            renderChecklistSection(priority)
          )}
        </div>

        {/* Step-specific Guidance */}
        {currentStep < 4 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Step Guidance</span>
            </div>
            <p className="text-xs text-blue-800">
              {currentStep === 1 && "Prepare your identity documents while completing personal information."}
              {currentStep === 2 && "Gather employment-related documents as you specify visa details."}
              {currentStep === 3 && "Collect financial evidence to support your application."}
            </p>
          </div>
        )}

        {/* Completion Status */}
        {completionStats.canProceed && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-900">
                All critical items completed!
              </span>
            </div>
            <p className="text-xs text-green-800 mt-1">
              You can proceed to the next step. Consider completing recommended items to strengthen your application.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChecklistValidator;

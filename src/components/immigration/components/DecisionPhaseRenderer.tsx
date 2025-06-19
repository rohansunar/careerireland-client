"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FileText } from "lucide-react";

import { DecisionDetails, AppealDetails } from "../types/workflow.types";

interface DecisionPhaseRendererProps {
  decisionData?: DecisionDetails;
  appealOptions?: AppealDetails;
  onAppealSubmit: (appealData: any) => void;
}

const DecisionPhaseRenderer: React.FC<DecisionPhaseRendererProps> = ({
  decisionData,
  appealOptions,
  onAppealSubmit
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 border-2 border-green-600">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Decision & Appeals</h2>
            <p className="text-gray-600">Final decision and appeal process if needed</p>
          </div>
        </div>
        <Badge variant="outline">
          Decision Phase
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle size={20} />
            Work Permits Decision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Decision & Appeals Phase</h3>
            <p className="text-gray-600 mb-4">
              This phase handles final decisions and appeal processes.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={14} />
                <span>Decision Notification</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle size={14} />
                <span>Appeal Process</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FileText size={14} />
                <span>Final Outcome</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionPhaseRenderer;

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react";

import { TimelineDetails, Milestone } from "../types/workflow.types";

interface TimelinePhaseRendererProps {
  timelineData?: TimelineDetails;
  milestones: Milestone[];
}

const TimelinePhaseRenderer: React.FC<TimelinePhaseRendererProps> = ({
  timelineData,
  milestones
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 border-2 border-yellow-600">
            <Clock size={24} className="text-yellow-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Processing Timeline</h2>
            <p className="text-gray-600">Track expected processing times and milestones</p>
          </div>
        </div>
        <Badge variant="outline">
          Timeline Phase
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={20} />
            Timeline to Expect Outcome
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Timeline Phase</h3>
            <p className="text-gray-600 mb-4">
              This phase tracks processing times and milestones.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Clock size={14} />
                <span>Processing Timeline</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar size={14} />
                <span>Milestone Tracking</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <AlertCircle size={14} />
                <span>Status Updates</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelinePhaseRenderer;

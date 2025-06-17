"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Send, AlertTriangle } from "lucide-react";

import { QueryDetails } from "../types/workflow.types";

interface QueryPhaseRendererProps {
  queries: QueryDetails[];
  onQueryResponse: (queryId: string, response: any) => void;
}

const QueryPhaseRenderer: React.FC<QueryPhaseRendererProps> = ({
  queries,
  onQueryResponse
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 border-2 border-indigo-600">
            <MessageSquare size={24} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Query Management</h2>
            <p className="text-gray-600">Handle additional information requests</p>
          </div>
        </div>
        <Badge variant="outline">
          Query Phase
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare size={20} />
            Queries from DETE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Query Management Phase</h3>
            <p className="text-gray-600 mb-4">
              This phase handles additional information requests from authorities.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <MessageSquare size={14} />
                <span>Query Management</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FileText size={14} />
                <span>Response Preparation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Send size={14} />
                <span>Response Submission</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueryPhaseRenderer;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  Trash2,
  Calendar,
  Shield,
  FolderOpen,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Enhanced document categories with subcategories
type DocumentCategory =
  | "Identity Documents"
  | "Financial Documents"
  | "Employment Documents"
  | "Educational Documents"
  | "Immigration Documents";

type DocumentType =
  | "Passport"
  | "National ID"
  | "Birth Certificate"
  | "Bank Statement"
  | "Tax Return"
  | "Salary Slip"
  | "Employment Letter"
  | "Contract"
  | "Reference Letter"
  | "Degree"
  | "Transcript"
  | "Certification"
  | "Previous Visa"
  | "Entry Stamp"
  | "Permit"
  | "Photo"
  | "Address Proof";

type DocumentStatus = "Pending" | "Approved" | "Rejected" | "Expired";

type DocumentPriority = "Critical" | "High" | "Medium" | "Low";

interface UploadedDoc {
  id: string;
  category: DocumentCategory;
  type: DocumentType;
  name: string;
  status: DocumentStatus;
  priority: DocumentPriority;
  uploadedAt: Date;
  expiryDate?: Date;
  fileSize: string;
  version: number;
  rejectionReason?: string;
  isRequired: boolean;
}

// Enhanced sample documents with comprehensive data
const staticUploadedDocs: UploadedDoc[] = [
  {
    id: "s1",
    category: "Identity Documents",
    type: "Passport",
    name: "passport_scan.pdf",
    status: "Approved",
    priority: "Critical",
    uploadedAt: new Date("2025-05-01T10:30:00"),
    expiryDate: new Date("2030-05-01"),
    fileSize: "2.4 MB",
    version: 1,
    isRequired: true
  },
  {
    id: "s2",
    category: "Identity Documents",
    type: "Photo",
    name: "profile_photo.jpg",
    status: "Pending",
    priority: "High",
    uploadedAt: new Date("2025-05-02T15:45:00"),
    fileSize: "1.2 MB",
    version: 1,
    isRequired: true
  },
  {
    id: "s3",
    category: "Educational Documents",
    type: "Degree",
    name: "degree_certificate.pdf",
    status: "Rejected",
    priority: "High",
    uploadedAt: new Date("2025-04-28T08:20:00"),
    fileSize: "3.1 MB",
    version: 2,
    rejectionReason: "Document quality too low, please upload a clearer scan",
    isRequired: true
  },
  {
    id: "s4",
    category: "Identity Documents",
    type: "Address Proof",
    name: "utility_bill.jpg",
    status: "Pending",
    priority: "Medium",
    uploadedAt: new Date("2025-05-03T12:00:00"),
    fileSize: "1.8 MB",
    version: 1,
    isRequired: true
  },
  {
    id: "s5",
    category: "Financial Documents",
    type: "Bank Statement",
    name: "bank_statement_march.pdf",
    status: "Approved",
    priority: "High",
    uploadedAt: new Date("2025-04-15T09:15:00"),
    fileSize: "856 KB",
    version: 1,
    isRequired: true
  },
  {
    id: "s6",
    category: "Employment Documents",
    type: "Employment Letter",
    name: "employment_letter.pdf",
    status: "Expired",
    priority: "Critical",
    uploadedAt: new Date("2025-03-10T14:20:00"),
    expiryDate: new Date("2025-05-01"),
    fileSize: "445 KB",
    version: 1,
    isRequired: true
  },
  {
    id: "s7",
    category: "Immigration Documents",
    type: "Previous Visa",
    name: "previous_visa_stamp.jpg",
    status: "Approved",
    priority: "Medium",
    uploadedAt: new Date("2025-04-20T11:30:00"),
    fileSize: "2.1 MB",
    version: 1,
    isRequired: false
  }
];

// Helper functions for styling and categorization
const getStatusBadgeClass = (status: DocumentStatus) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "Expired":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: DocumentStatus) => {
  switch (status) {
    case "Approved":
      return <CheckCircle className="w-4 h-4" />;
    case "Pending":
      return <Clock className="w-4 h-4" />;
    case "Rejected":
      return <XCircle className="w-4 h-4" />;
    case "Expired":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getPriorityBadgeClass = (priority: DocumentPriority) => {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-800 border-red-200";
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Low":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getCategoryIcon = (category: DocumentCategory) => {
  switch (category) {
    case "Identity Documents":
      return <Shield className="w-5 h-5" />;
    case "Financial Documents":
      return <FileText className="w-5 h-5" />;
    case "Employment Documents":
      return <FileText className="w-5 h-5" />;
    case "Educational Documents":
      return <FileText className="w-5 h-5" />;
    case "Immigration Documents":
      return <FileText className="w-5 h-5" />;
    default:
      return <FolderOpen className="w-5 h-5" />;
  }
};

const DocumentVault: React.FC = () => {
  const [uploadedDocs] = useState<UploadedDoc[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<DocumentStatus | "All">("All");

  const allDocs = [...staticUploadedDocs, ...uploadedDocs];

  // Filter documents based on category, status, and search term
  const filteredDocs = allDocs.filter(doc => {
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || doc.status === selectedStatus;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const totalDocs = allDocs.length;
  const approvedDocs = allDocs.filter(doc => doc.status === "Approved").length;
  const pendingDocs = allDocs.filter(doc => doc.status === "Pending").length;
  const rejectedDocs = allDocs.filter(doc => doc.status === "Rejected").length;
  const expiredDocs = allDocs.filter(doc => doc.status === "Expired").length;
  const criticalDocs = allDocs.filter(doc => doc.priority === "Critical").length;

  const categories: (DocumentCategory | "All")[] = [
    "All",
    "Identity Documents",
    "Financial Documents",
    "Employment Documents",
    "Educational Documents",
    "Immigration Documents"
  ];

  const statuses: (DocumentStatus | "All")[] = ["All", "Pending", "Approved", "Rejected", "Expired"];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header with Security Badge */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            Document Vault
          </h2>
          <p className="text-gray-600 mt-1">Secure document management with encryption and verification</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            Encrypted Storage
          </Badge>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalDocs}</p>
              <p className="text-xs text-gray-500">Total Documents</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-700">{approvedDocs}</p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-700">{pendingDocs}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-700">{rejectedDocs}</p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-orange-700">{expiredDocs}</p>
              <p className="text-xs text-gray-500">Expired</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-700">{criticalDocs}</p>
              <p className="text-xs text-gray-500">Critical</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition-colors">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
        <p className="text-gray-600 mb-4">Drag and drop files here or click to browse</p>
        <Button className="mb-2">
          <Upload className="w-4 h-4 mr-2" />
          Choose Files
        </Button>
        <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Document Library</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory | "All")}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter documents by category"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as DocumentStatus | "All")}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter documents by status"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredDocs.length} of {totalDocs} documents
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedStatus !== "All" && ` with status ${selectedStatus}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Enhanced Document Table */}
        {filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "All" || selectedStatus !== "All"
                ? "Try adjusting your filters or search terms"
                : "Upload your first document to get started"
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category & Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    {/* Document Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {getStatusIcon(doc.status)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">
                            {doc.fileSize} • v{doc.version}
                            {doc.isRequired && (
                              <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200">
                                Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Type */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(doc.category)}
                          <span className="text-sm font-medium text-gray-900">{doc.category}</span>
                        </div>
                        <span className="text-sm text-gray-500">{doc.type}</span>
                      </div>
                    </td>

                    {/* Status & Priority */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <Badge
                          variant="outline"
                          className={`w-fit text-xs flex items-center gap-1 ${getStatusBadgeClass(doc.status)}`}
                        >
                          {getStatusIcon(doc.status)}
                          {doc.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`w-fit text-xs ${getPriorityBadgeClass(doc.priority)}`}
                        >
                          {doc.priority}
                        </Badge>
                        {doc.status === "Rejected" && doc.rejectionReason && (
                          <div className="text-xs text-red-600 mt-1 max-w-xs">
                            {doc.rejectionReason}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Details */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">Uploaded:</span> {doc.uploadedAt.toLocaleDateString()}
                        </div>
                        {doc.expiryDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-500">Expires:</span> {doc.expiryDate.toLocaleDateString()}
                            {doc.expiryDate < new Date() && (
                              <Badge variant="outline" className="ml-1 text-xs bg-red-50 text-red-700 border-red-200">
                                Expired
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentVault;

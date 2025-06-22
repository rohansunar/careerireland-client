"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  FileText,
  Download,
  Eye,
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



interface UploadedDoc {
  id: string;
  category: DocumentCategory;
  type: DocumentType;
  name: string;
  uploadedAt: Date;
  expiryDate?: Date;
  fileSize: string;
}

// Sample documents with essential data
const staticUploadedDocs: UploadedDoc[] = [
  {
    id: "s1",
    category: "Identity Documents",
    type: "Passport",
    name: "passport_scan.pdf",
    uploadedAt: new Date("2025-05-01T10:30:00"),
    expiryDate: new Date("2030-05-01"),
    fileSize: "2.4 MB",
  },
  {
    id: "s2",
    category: "Identity Documents",
    type: "Photo",
    name: "profile_photo.jpg",
    uploadedAt: new Date("2025-05-02T15:45:00"),
    fileSize: "1.2 MB",
  },
  {
    id: "s3",
    category: "Educational Documents",
    type: "Degree",
    name: "degree_certificate.pdf",
    uploadedAt: new Date("2025-04-28T08:20:00"),
    fileSize: "3.1 MB",
  },
  {
    id: "s4",
    category: "Identity Documents",
    type: "Address Proof",
    name: "utility_bill.jpg",
    uploadedAt: new Date("2025-05-03T12:00:00"),
    fileSize: "1.8 MB",
  },
  {
    id: "s5",
    category: "Financial Documents",
    type: "Bank Statement",
    name: "bank_statement_march.pdf",
    uploadedAt: new Date("2025-04-15T09:15:00"),
    fileSize: "856 KB",
  },
];

// Helper functions for styling and categorization


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

  const allDocs = [...staticUploadedDocs, ...uploadedDocs];

  // Filter documents based on category and search term
  const filteredDocs = allDocs.filter(doc => {
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: (DocumentCategory | "All")[] = [
    "All",
    "Identity Documents",
    "Financial Documents",
    "Employment Documents",
    "Educational Documents",
    "Immigration Documents"
  ];

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


          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredDocs.length} of {allDocs.length} documents
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Enhanced Document Table */}
        {filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your filters or search terms"
                : "No documents available"
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
                          <FileText className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">
                            {doc.fileSize}
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



                    {/* Details */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-500">Uploaded:</span> {doc.uploadedAt.toLocaleDateString()}
                        </div>
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

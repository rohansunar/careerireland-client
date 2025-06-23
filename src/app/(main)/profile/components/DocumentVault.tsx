"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDocuments } from "@/hooks/use-query";

import {
  FileText,
  Download,
  Eye,
  Calendar,
  Shield,
  FolderOpen,
  Search,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Enhanced document categories with subcategories
type DocumentCategory =
  | "Identity Documents"
  | "Financial Documents"
  | "Employment Documents"
  | "Educational Documents"
  | "Immigration Documents"
  | "All";

// Helper function to map API document categories to display categories
const mapDocumentCategory = (apiCategory: string): DocumentCategory => {
  const categoryMap: Record<string, DocumentCategory> = {
    'identity': 'Identity Documents',
    'financial': 'Financial Documents',
    'employment': 'Employment Documents',
    'educational': 'Educational Documents',
    'immigration': 'Immigration Documents',
  };
  return categoryMap[apiCategory.toLowerCase()] || 'Immigration Documents';
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

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
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState(1);
  const pageLimit = 50;

  // Fetch documents from API
  const { data: documentsResponse, isLoading, error, refetch } = useDocuments(currentPage, pageLimit);

  // Transform API data to display format
  const transformedDocs = useMemo(() => {
    if (!documentsResponse?.data) return [];

    return documentsResponse.data.map((doc: IDocument) => ({
      id: doc.id,
      category: mapDocumentCategory(doc.document_category),
      type: doc.document_type,
      name: doc.original_filename || doc.document_name,
      uploadedAt: new Date(doc.uploaded_at),
      expiryDate: doc.expiry_date ? new Date(doc.expiry_date) : undefined,
      fileSize: formatFileSize(doc.file_size),
      filePath: doc.file_path,
      uploadedBy: doc.uploaded_by,
    }));
  }, [documentsResponse?.data]);

  // Filter documents based on category and search term
  const filteredDocs = useMemo(() => {
    return transformedDocs.filter(doc => {
      const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [transformedDocs, selectedCategory, searchTerm]);

  const categories: DocumentCategory[] = [
    "All",
    "Identity Documents",
    "Financial Documents",
    "Employment Documents",
    "Educational Documents",
    "Immigration Documents"
  ];

  // Error state
  if (error) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Document Vault
            </h2>
            <p className="text-gray-600 mt-1">Secure document management with encryption and verification</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load documents</h3>
            <p className="text-gray-500 mb-4">
              There was an error loading your documents. Please try again.
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <Loader2 className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          {isLoading && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              Loading...
            </Badge>
          )}
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
            Showing {filteredDocs.length} of {transformedDocs.length} documents
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
            {documentsResponse?.pagination && (
              <span className="ml-2 text-gray-400">
                (Page {documentsResponse.pagination.page} of {documentsResponse.pagination.totalPages},
                Total: {documentsResponse.pagination.total})
              </span>
            )}
          </p>
        </div>

        {/* Enhanced Document Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-16 h-16 text-blue-300 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading documents...</h3>
            <p className="text-gray-500">Please wait while we fetch your documents</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your filters or search terms"
                : "No documents have been uploaded yet"
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

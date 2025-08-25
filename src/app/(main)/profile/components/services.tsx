import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/loader/empty-state";
import { format } from "date-fns";
import { Calendar, User } from "lucide-react";
import React from "react";

/**
 * Get status badge variant based on service status
 * @param {string} status - The service status
 * @return {string} Badge variant
 */
const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'default';
    case 'active': return 'secondary';
    case 'pending': return 'outline';
    default: return 'outline';
  }
};

const Services = ({ user }: { user: IProfile }) => {
  return (
    <TabsContent value="services">
      <Card>
        <CardHeader>
          <CardTitle>Mentor Services</CardTitle>
          <CardDescription>Your booked mentoring sessions ({user.services.length} total)</CardDescription>
        </CardHeader>
        <CardContent>
          {user.services.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No Mentor Services"
              description="You haven't booked any mentoring sessions yet. Browse our mentors to find the perfect match for your career goals."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {service.mentor_services?.name || "Service Name"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {service.mentor_services?.mentor?.name || "Professional Service"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          €{service.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(service.status)}>
                          {service.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {service.progress}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {format(new Date(service.createdAt), "MMM dd, yyyy")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Services;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/loader/empty-state";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import React from "react";

const Services = ({ user }: { user: IProfile }) => {
  return (
    <TabsContent value="services">
      <Card>
        <CardHeader>
          <CardTitle>Mentor Services</CardTitle>
          <CardDescription>Your booked mentoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {user.services.length === 0 && (
            <EmptyState
              icon={Calendar}
              title="No Mentor Services"
              description="You haven't booked any mentoring sessions yet. Browse our mentors to find the perfect match for your career goals."
            />
          )}
          <div className="space-y-4">
            {user.services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium">
                    {service.mentor_services?.name || "Service Name"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {service.mentor_services?.mentor?.name
                      ? `with ${service.mentor_services.mentor.name}`
                      : "Professional Service"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(service.createdAt), "PPP")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : service.status === "active"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {service.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Progress: {service.progress}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">€{service.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Services;

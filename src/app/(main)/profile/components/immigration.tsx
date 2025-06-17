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
import { Plane } from "lucide-react";
import React from "react";

const Immigration = ({ user }: { user: IProfile }) => {
  return (
    <TabsContent value="immigration">
      <Card>
        <CardHeader>
          <CardTitle>Immigration Services</CardTitle>
          <CardDescription>Your immigration applications</CardDescription>
        </CardHeader>
        <CardContent>
          {user.immigration_services.length === 0 && (
            <EmptyState
              icon={Plane}
              title="No Immigration Services"
              description="You haven't applied for any immigration services yet. Explore our immigration services to start your journey."
            />
          )}
          <div className="space-y-4">
            {user.immigration_services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium">
                    {service.immigration_service.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(service.createdAt), "PPP")}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="font-medium">€{service.amount}</div>
                  {/* <StatusBadge status={service.status} progress={service.progress} /> */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Immigration;

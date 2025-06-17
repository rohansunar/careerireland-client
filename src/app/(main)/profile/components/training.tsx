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
import { BookOpenText } from "lucide-react";
import React from "react";

const Training = ({ user }: { user: IProfile }) => {
  return (
    <TabsContent value="training">
      <Card>
        <CardHeader>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>Your training programs</CardDescription>
        </CardHeader>
        <CardContent>
          {user.training.length === 0 && (
            <EmptyState
              icon={BookOpenText}
              title="Training Programs"
              description="You haven't applied for any training program yet. Explore our training program to start your journey."
            />
          )}
          <div className="space-y-4">
            {user.training.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium">{service.training.name}</div>
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

export default Training;

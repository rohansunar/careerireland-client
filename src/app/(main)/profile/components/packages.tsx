import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { FileText } from "lucide-react";
import { EmptyState } from "@/loader/empty-state";

const Packages = ({ user }: { user: IProfile }) => {
  return (
    <TabsContent value="packages">
      <Card>
        <CardHeader>
          <CardTitle>Packages</CardTitle>
          <CardDescription>Your purchased packages</CardDescription>
        </CardHeader>
        <CardContent>
          {user.packages.length === 0 && (
            <EmptyState
              icon={FileText}
              title="No Packages"
              description="You haven't purchased any packages yet. Check out our packages to enhance your career development journey."
            />
          )}
          <div className="space-y-4">
            {user.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="font-medium">{pkg.package.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(pkg.createdAt), "PPP")}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="font-medium">€{pkg.amount}</div>
                  {/* <StatusBadge status={pkg.status} progress={pkg.progress} /> */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Packages;

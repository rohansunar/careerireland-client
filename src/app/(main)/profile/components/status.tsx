import { Badge } from "@/components/ui/badge";
import React from "react";
interface StatusBadgeProps {
  status: string;
  progress: string;
}

export function StatusBadge({ status, progress }: StatusBadgeProps) {
  const getColor = () => {
    if (status === "paid" && progress === "Pending")
      return "bg-[#404bd0] hover:bg-[#404bd0]/90";
    if (status === "paid" && progress === "Completed")
      return "bg-green-500 hover:bg-green-600";
    return "bg-destructive hover:bg-destructive/90";
  };

  return (
    <Badge className={`${getColor()} text-white rounded`}>{progress}</Badge>
  );
}

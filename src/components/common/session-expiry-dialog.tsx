"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

interface SessionExpiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Session Expiry Dialog Component
 * Shows user-friendly dialog when session expires with login prompt
 * @param {SessionExpiryDialogProps} props - Component props
 * @return {JSX.Element} Session expiry dialog component
 */
const SessionExpiryDialog: React.FC<SessionExpiryDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const router = useRouter();

  /**
   * Handle login redirect
   * Redirects user to login page
   */
  const handleLoginRedirect = () => {
    onOpenChange(false);
    router.push("/auth/login");
  };

  /**
   * Handle dialog close
   * Closes dialog and redirects to home
   */
  const handleClose = () => {
    onOpenChange(false);
    router.push("/");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            Session Expired
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Your session has expired for security reasons. Please log in again to continue using the application.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleClose}
            variant="outline"
            className="flex items-center gap-2 flex-1"
          >
            Go to Home
          </Button>
          <Button
            onClick={handleLoginRedirect}
            className="flex items-center gap-2 flex-1"
          >
            <LogIn className="w-4 h-4" />
            Log In Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpiryDialog;

"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  isLoading?: boolean;
}

/**
 * Reusable confirmation dialog component
 * 
 * This component provides a consistent confirmation dialog interface
 * to replace browser alert() and confirm() calls throughout the application.
 * It follows the established design patterns and uses existing UI components.
 * 
 * @param isOpen - Controls dialog visibility
 * @param onClose - Callback when dialog is closed/cancelled
 * @param onConfirm - Callback when user confirms the action
 * @param title - Dialog title text
 * @param description - Dialog description/message text
 * @param confirmText - Custom text for confirm button (default: "Confirm")
 * @param cancelText - Custom text for cancel button (default: "Cancel")
 * @param variant - Visual variant for the confirm button (default: "default")
 * @param isLoading - Shows loading state on confirm button
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${
            variant === "destructive" ? "text-destructive" : ""
          }`}>
            {variant === "destructive" && <AlertTriangle className="w-5 h-5" />}
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant}
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                {variant === "destructive" && <Trash2 className="w-4 h-4 mr-2" />}
                {confirmText}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;

"use client";

import { ReactNode, forwardRef, useCallback, useState } from "react";

import Close from "@/components/icons/close";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type BaseModalProps = {
  open?: boolean;
  onCloseIconClick?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  showCloseButton?: boolean;
  closeIcon?: ReactNode;
  contentClassName?: string;
  width?: string;
  closeOnOutsideClick?: boolean;
  footerClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
};

type TriggeredModalProps = BaseModalProps & {
  trigger: ReactNode;
};

type ModalWithTitleProps = {
  title?: ReactNode;
  description?: ReactNode;
  showHeader?: boolean;
};

type ModalWithActionsProps = {
  primaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: ButtonProps["variant"];
    className?: string;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: ButtonProps["variant"];
    className?: string;
  };
  showFooter?: boolean;
  footerContent?: ReactNode;
};

export type ModalProps = BaseModalProps &
  Partial<TriggeredModalProps> &
  ModalWithTitleProps &
  ModalWithActionsProps;

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      onCloseIconClick,
      title,
      description,
      showHeader,
      primaryAction,
      secondaryAction,
      showFooter,
      footerContent,
      children,
      trigger,
      showCloseButton = true,
      closeIcon,
      contentClassName,
      width,
      closeOnOutsideClick = true,
      footerClassName = "",
      headerClassName = "",
      bodyClassName = "",
    },
    ref
  ) => {
    const [isControlledOpen, setIsControlledOpen] = useState(false);

    // Determine if we're using internal or external state
    const isOpen = open !== undefined ? open : isControlledOpen;

    const handleOpenChange = useCallback(
      (newOpen: boolean) => {
        if (open === undefined) {
          setIsControlledOpen(newOpen);
        }
        if (onOpenChange) {
          onOpenChange(newOpen);
        }
      },
      [open, onOpenChange]
    );

    // Handle outside clicks
    const handleOutsideClick = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any) => {
        // If we're not allowing outside clicks or if loading, prevent closing
        if (!closeOnOutsideClick || primaryAction?.loading) {
          event.preventDefault();
        }
      },
      [closeOnOutsideClick, primaryAction?.loading]
    );

    // Close the modal explicitly (for close button)
    const handleClose = useCallback(() => {
      handleOpenChange(false);
      onCloseIconClick?.();
    }, [handleOpenChange, onCloseIconClick]);

    // Determine whether to show header based on props
    const shouldShowHeader =
      showHeader !== undefined ? showHeader : Boolean(title || description);

    // Determine whether to show footer based on props
    const shouldShowFooter =
      showFooter !== undefined
        ? showFooter
        : Boolean(primaryAction || secondaryAction || footerContent);

    // Create style object for custom width if provided
    const customStyles = width ? { style: { width, maxWidth: "100vw" } } : {};

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          ref={ref}
          className={cn(
            "p-0 gap-0 !rounded-10 max-w-[91vw] sm:max-w-lg relative",
            contentClassName
          )}
          onPointerDownOutside={handleOutsideClick}
          onEscapeKeyDown={handleOutsideClick}
          {...customStyles}
        >
          <div className="flex items-start justify-between">
            {shouldShowHeader && (
              <DialogHeader
                className={`flex-1 border-b border-b-secondary-20 p-4 ${headerClassName}`}
              >
                {title && (
                  <DialogTitle className="title-6-medium text-left text-secondary">
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-[12px] top-[9.5px] m-0 rounded-full p-0 focus:outline-none disabled:pointer-events-none"
                aria-label="Close"
              >
                {/* {closeIcon || <X className="size-4" />} */}
                {closeIcon || <Close className="size-8 text-secondary" />}
              </button>
            )}
          </div>
          <div className={`p-4 ${bodyClassName}`}>{children}</div>

          {shouldShowFooter && (
            <DialogFooter
              className={`flex flex-col-reverse p-4 sm:flex-row sm:justify-end sm:space-x-2 ${footerClassName} relative`}
            >
              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant || "outline"}
                  onClick={secondaryAction.onClick}
                  disabled={secondaryAction.disabled}
                  className={`btn-primary-outlined ${secondaryAction.className}`}
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  variant={primaryAction.variant || "default"}
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled || primaryAction.loading}
                  className={`btn-primary ${primaryAction.className}`}
                >
                  {primaryAction.loading ? "Loading..." : primaryAction.label}
                </Button>
              )}
              {footerContent}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

Modal.displayName = "Modal";

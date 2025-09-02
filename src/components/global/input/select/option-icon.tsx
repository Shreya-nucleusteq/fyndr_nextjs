import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

interface OptionIconProps {
  icon?: string | React.ReactNode;
  label: string;
  className?: string;
}

export const OptionIcon: React.FC<OptionIconProps> = ({
  icon,
  label,
  className = "",
}) => {
  if (!icon) return null;

  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt={label}
        height={16}
        width={16}
        className={cn("shrink-0 object-contain size-4", className)}
      />
    );
  }

  if (React.isValidElement(icon)) {
    return (
      <span className={cn("shrink-0 size-4", className)}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
      </span>
    );
  }
  return null;
};

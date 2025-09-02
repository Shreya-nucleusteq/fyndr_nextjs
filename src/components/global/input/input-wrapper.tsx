import React from "react";

import InfoTooltip from "../tooltip/info-tooltip";

type Props = {
  children: React.ReactNode;
  rightNode?: React.ReactNode;
  topRightNode?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  showRequired?: boolean;
  info?: React.ReactNode;
  className?: string;
};

const InputWrapper = ({
  children,
  rightNode,
  label,
  disabled = false,
  info = null,
  showRequired = false,
  className = "",
  topRightNode,
}: Props) => {
  return (
    <div
      className={`relative flex h-[46px] grow items-center gap-1 rounded-10 border border-secondary-20 p-1 text-black-50 ${!disabled ? "bg-white" : "bg-black-0.5"} ${className}`}
    >
      {label && (
        <div
          className={`absolute -top-px left-[18px] z-[2] m-0 h-px ${!disabled ? "bg-white" : "bg-black-0.5"}`}
        >
          <div className="placeholder relative left-0 top-[-14px] z-20 bg-transparent px-2 text-base font-normal">
            <span className="flex-center h-[26px] gap-2">
              <span className="flex gap-1">
                <span className="text-[#999999]">{label}</span>
                {showRequired && <span className="text-red-600">*</span>}
              </span>
              {info && <InfoTooltip>{info}</InfoTooltip>}
            </span>
          </div>
        </div>
      )}
      {children}
      {rightNode || null}
      {topRightNode ? (
        <div className="absolute right-[17px] top-[-15px]">{topRightNode}</div>
      ) : null}
    </div>
  );
};

export default InputWrapper;

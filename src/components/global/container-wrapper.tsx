import React, { ReactNode } from "react";

interface ContainerWrapperProps {
  title?: string;
  headerOption?: ReactNode;
  children?: ReactNode;
  featured?: boolean;
  noPadding?: boolean;
}

const ContainerWrapper: React.FC<ContainerWrapperProps> = ({
  title,
  headerOption,
  children,
  featured,
  noPadding,
}) => {
  const paddingX = "px-8";
  const paddingTop = "pt-4";
  const paddingBottom = "pb-4";
  return (
    <div
      className={`mx-auto w-full ${paddingX} ${paddingTop} ${paddingBottom} max-w-screen-xl bg-gray-100`}
    >
      <article>
        <div
          className={`flex-between ${
            headerOption ? "mb-8" : ""
          } ${headerOption ? "h-[32px]" : ""}`}
        >
          {title && (
            <h2
              className={`title-5 text-primary ${!headerOption ? "mb-4" : ""}`}
            >
              {title}
            </h2>
          )}
          {headerOption && <div>{headerOption}</div>}
        </div>

        <div
          className={`${noPadding ? "" : "p-10"} rounded-10 bg-white shadow-sm`}
        >
          <div className="rounded-lg bg-white shadow-sm">
            <div className={`${!featured ? "" : ""}`}>{children}</div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ContainerWrapper;

"use client";

import { FC } from "react";

interface AnalyticsSummeryItemProps {
  value?: string | number;
  subtitle?: string | number;
}

const AnalyticsSummeryItem: FC<AnalyticsSummeryItemProps> = ({
  value,
  subtitle,
}) => {
  return (
    <div className=" h-full flex flex-col justify-between p-5 rounded-lg bg-neutral-900">
      <h1 className=" text-2xl lg:text-3xl">
        {value}
        {subtitle && (
          <p className=" font-medium text-stone-400 lg:text-xl break-words">
            {subtitle}
          </p>
        )}
      </h1>
    </div>
  );
};

export default AnalyticsSummeryItem;

"use client";

import React, { FC, PropsWithChildren } from "react";

interface IconButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      className={` cursor-pointer rounded-full p-2 hover:bg-neutral-800 ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default IconButton;

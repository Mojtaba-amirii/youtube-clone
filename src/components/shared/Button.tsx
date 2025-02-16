"use client";

import { FC, MouseEventHandler, PropsWithChildren, useMemo } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: "primary" | "secondary" | "box" | "rounded" | "rounded-dark";
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  type,
  children,
  className,
}) => {
  const typeClassName = useMemo(() => {
    switch (type) {
      case "primary":
        return " text-blue-400 uppercase text-sm";
      case "secondary":
        return " uppercase text-sm";
      case "box":
        return "bg-neutral-900 uppercase font-medium bg-sky-500 rounded-sm px-4 py-2";
      case "rounded":
        return "bg-stone-950 font-medium bg-zinc-300 rounded-full px-3 py-2";
      case "rounded-dark":
        return "bg-neutral-800 text-white rounded-full font-medium px-3 py-2";
      default:
        return "";
    }
  }, [type]);

  return (
    <button
      type="button"
      title="btn"
      onClick={onClick}
      className={`${typeClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

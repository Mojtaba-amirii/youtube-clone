"use client";

import { FC } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  pattern?: ValidationRule<RegExp>;
  className?: string;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  pattern,
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required, pattern })}
        placeholder=""
        className={` peer w-full px-4 py-2 border bg-zinc-800 transition outline-none focus:outline-none rounded ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : " border-zinc-500  focus:border-blue-400"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label
        className={`absolute bg-zinc-800 px-1 top-2 left-4 z-[1] duration-100 -translate-y-5 transform origin-[0px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 ${
          errors[id] ? " text-red-500" : " text-zinc-500"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

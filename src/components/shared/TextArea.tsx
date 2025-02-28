import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  changeValue: (id: string, value: string) => void;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  changeValue,
}) => {
  return (
    <div className=" relative">
      <textarea
        onInput={(e) => changeValue?.(id, e.currentTarget.value || "")}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full px-4 pt-8 pb-2 h-28 border bg-stone-950 transition outline-hidden focus:outline-hidden rounded focus:border-blue-400 disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : " border-zinc-500 focus:border-blue-400"
        }`}
      />
      <label
        htmlFor={id}
        className={` absolute bg-stone-900 px-1 top-2 left-4 z-1 ${
          errors[id] ? "text-red-500" : "text-zinc-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;

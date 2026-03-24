import * as React from "react";
import { cn } from "@/lib/utils";

interface PlayerFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  type?: "text" | "email" | "select";
  options?: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function PlayerFormField({
  label,
  name,
  required = false,
  error,
  type = "text",
  options,
  value,
  onChange,
  className,
  ...props
}: PlayerFormFieldProps) {
  const inputClasses = cn(
    "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 transition-colors",
    error ? "border-red-500" : "border-gray-300",
    className
  );

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      
      {type === "select" && options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={inputClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
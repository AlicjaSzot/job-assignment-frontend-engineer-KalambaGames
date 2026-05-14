import React from "react";

interface FormInputProps {
  fieldSize?: "lg" | "sm";
  id?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  required?: boolean;
  children?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FormInput({
  fieldSize,
  type,
  placeholder,
  value,
  required,
  children,
  onChange,
  id,
}: FormInputProps): JSX.Element {
  const sizeClass = fieldSize ? ` form-control-${fieldSize}` : "";
  return (
    <fieldset className="form-group">
      <input
        autoComplete="on"
        id={id ?? placeholder?.toLowerCase().replace(/\s+/g, "-")}
        aria-label={placeholder}
        className={`form-control${sizeClass}`}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
      {children}
    </fieldset>
  );
}

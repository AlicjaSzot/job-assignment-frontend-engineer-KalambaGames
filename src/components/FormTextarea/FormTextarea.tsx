import React from "react";

interface FormTextareaProps {
  id: string;
  fieldSize?: "lg" | "sm";
  placeholder?: string;
  rows?: number;
}

export default function FormTextarea({ fieldSize, placeholder, rows, id }: FormTextareaProps): JSX.Element {
  const sizeClass = fieldSize ? ` form-control-${fieldSize}` : "";
  return (
    <fieldset className="form-group">
      <textarea id={id} className={`form-control${sizeClass}`} placeholder={placeholder} rows={rows} />
    </fieldset>
  );
}

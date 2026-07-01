import { clsx } from "clsx";
import { Input, Textarea, Select } from "@/components/atoms/Input";

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: "input" | "textarea" | "select" | "custom";
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  selectProps?: React.InputHTMLAttributes<HTMLSelectElement> & {
    children?: React.ReactNode;
  };
}

export function FormField({
  label,
  id,
  error,
  required,
  className,
  children,
  type = "input",
  inputProps,
  textareaProps,
  selectProps,
}: FormFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--on-surface)]"
      >
        {label}
        {required ? (
          <span className="text-[var(--error)] ml-0.5">*</span>
        ) : null}
      </label>
      {type === "input" ? (
        <Input id={id} name={id} error={!!error} {...inputProps} />
      ) : type === "textarea" ? (
        <Textarea
          id={id}
          name={id}
          error={!!error}
          rows={4}
          {...textareaProps}
        />
      ) : type === "select" ? (
        <Select id={id} name={id} error={!!error} {...selectProps}>
          {selectProps?.children}
        </Select>
      ) : (
        children
      )}
      {error ? (
        <p className="text-xs text-[var(--error)]">{error}</p>
      ) : null}
    </div>
  );
}

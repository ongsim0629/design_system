import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  description?: string; // helpText를 description으로 통일
  error?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  options: Option[];
  className?: string;
}

export const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      name,
      label,
      description,
      error,
      value,
      onValueChange,
      placeholder,
      disabled,
      required,
      options,
      className,
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={name} className={cn(error && "text-destructive")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            id={name}
            ref={ref}
            className={cn(
              error && "border-destructive focus:ring-destructive",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${name}-error`
                : description
                ? `${name}-description`
                : undefined
            }
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}

        {description && !error && (
          <p
            id={`${name}-description`}
            className="text-sm text-muted-foreground"
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
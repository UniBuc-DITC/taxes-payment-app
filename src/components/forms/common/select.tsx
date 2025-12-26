import { ReactNode, useId } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import ReactSelect, { Props as ReactSelectProps } from "react-select";

/** Data for a selectable item in a select list. */
type Option<TValue extends number | string> = {
  label: string;
  value: TValue;
};

type ManagedProps<
  TValue extends number | string,
  TFieldValues extends FieldValues,
> = {
  name: Path<TFieldValues>;
  label: ReactNode;
  options: Option<TValue>[];
  control: Control<TFieldValues>;
};

type Props<
  TValue extends number | string,
  TFieldValues extends FieldValues,
> = ManagedProps<TValue, TFieldValues> &
  // Allow downstream users to pass in custom values for
  // other React Select props which we do not handle.
  Omit<
    ReactSelectProps<Option<TValue>, false>,
    | keyof ManagedProps<TValue, TFieldValues>
    | "onChange"
    | "onBlur"
    | "value"
    | "unstyled"
    | "classNames"
  >;

/** A select input field. Integrated with React Hook Form (controlled component). */
const Select = <
  TValue extends number | string,
  TFieldValues extends FieldValues,
>({
  name,
  label,
  options,
  control,
  ...props
}: Props<TValue, TFieldValues>) => {
  const instanceId = useId();
  const inputId = `select-${instanceId}`;

  return (
    <>
      <label htmlFor={inputId} className="block">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <ReactSelect
            {...fieldProps}
            inputId={inputId}
            instanceId={instanceId}
            options={options}
            onChange={(newValue) => onChange(newValue?.value)}
            value={
              value ? options.find((option) => option.value === value) : null
            }
            // Remove all default styling, so that we can apply our custom styling using Tailwind
            // unstyled
            // classNames={{
            //   control: () => "border-2 border-blue-900 rounded-md",
            // }}
            {...props}
          />
        )}
      />
    </>
  );
};

export default Select;

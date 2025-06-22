import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import Select from "react-select";

type Option<T> = { value: T; label: string };

type Props<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TFieldPath;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues, TFieldPath>;
  options: Option<FieldPathValue<TFieldValues, TFieldPath>>[];
  defaultValue?: FieldPathValue<TFieldValues, TFieldPath>;
  isMulti?: boolean;
  disabled?: boolean;
};

export default function ControlledSelect<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
  rules,
  options = [],
  defaultValue,
  isMulti,
  disabled,
}: Props<TFieldValues, TFieldPath>) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      disabled={disabled}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <>
          <Select
            ref={ref}
            value={options.filter((option) => value.includes(option.value))}
            onChange={(newSelectedOptions) => {
              if (newSelectedOptions instanceof Array) {
                onChange(newSelectedOptions.map((option) => option.value));
              } else {
                onChange(newSelectedOptions?.value);
              }
            }}
            // Fix for https://github.com/JedWatson/react-select/issues/5459
            instanceId={name}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: error && !state.isFocused ? "red" : "intital",
              }),
            }}
          />
          {error && (
            <div className="text-xs text-red-500">
              {error?.message?.toString()}
            </div>
          )}
        </>
      )}
    />
  );
}

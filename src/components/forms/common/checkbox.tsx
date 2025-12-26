import { ComponentPropsWithRef, ReactNode, useId } from "react";

type ManagedProps = {
  name?: string;
  label: ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  readOnly?: boolean;
};

type Props = ManagedProps &
  Omit<ComponentPropsWithRef<"input">, keyof ManagedProps>;

/** Checkbox input component. Includes a label and supports controlled and uncontrolled usage. */
const Checkbox = ({
  name,
  label,
  defaultChecked,
  checked,
  readOnly,
  ...props
}: Props) => {
  const inputId = `checkbox-${useId()}`;

  return (
    <>
      <input
        type="checkbox"
        id={inputId}
        name={name}
        defaultChecked={defaultChecked}
        checked={checked}
        readOnly={readOnly}
        className="mr-2"
        {...props}
      />
      <label htmlFor={inputId}>{label}</label>
    </>
  );
};

export default Checkbox;

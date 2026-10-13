import { useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import React from "react";
import * as Label from "@radix-ui/react-label";
import { createTextFieldStyles,type TextFieldVariants } from "../../styles/TextFieldStyles";
import { ErrorIcon } from "../../assets/icons/ErrorIcon"; 

export interface InputFieldProps extends Omit<
  React.ComponentProps<"input">,
  "prefix" | "size"
> {
  error?: TextFieldVariants["error"];
  asChild?: boolean;
  size?: TextFieldVariants["size"];
  rootProps?: React.ComponentProps<"div">;
  label?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  labelProps?: React.ComponentProps<"label">;
  helperText?: string;
  helperTextProps?: React.ComponentProps<"p">;
  inputContainerProps?: React.ComponentProps<"div">;
  numberOnly?: boolean;
  required?: boolean;
}

export const TextField = React.forwardRef(
  (
    {
      rootProps: rawRootProps = {},
      error,
      label,
      labelProps: rawLabelProps = {},
      helperText,
      asChild,
      prefix,
      suffix,
      helperTextProps: rawHelperTextProps = {},
      inputContainerProps: rawInputContainerProps = {},
      size,
      disabled = false,
      numberOnly,
      required,
      ...rawInputProps
    }: InputFieldProps,
    ref,
  ) => {
    const id = useId();

    const textFieldStyles = createTextFieldStyles({
      error,
      size,
    });

    const { className: rootClassName, ...rootProps } = rawRootProps;
    const { className: inputClassName, ...inputProps } = rawInputProps;
    const { className: labelClassName, ...labelProps } = rawLabelProps;
    const { className: helperTextClassName, ...helperTextProps } =
      rawHelperTextProps;
    const { className: inputContainerClassName, ...inputContainerProps } =
      rawInputContainerProps;

    const Comp = asChild ? Slot : "input";
    return (
      <div
        className={textFieldStyles.root({
          className: rootClassName,
        })}
        {...rootProps}
      >
        {label ? (
          <Label.Root
            className={textFieldStyles.label({
              className: labelClassName,
            })}
            htmlFor={id}
            {...labelProps}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label.Root>
        ) : null}
        <div
          className={textFieldStyles.inputContainer({
            className:
              inputContainerClassName +
              ` ${disabled ? "bg-secondary-300/20  cursor-not-allowed" : ""}`,
          })}
          {...inputContainerProps}
        >
          {prefix && <div className={`text-[11px] px-2 `}>{prefix}</div>}
          <Comp
            id={id}
            disabled={disabled}
            className={textFieldStyles.input({ className: inputClassName })}
            ref={ref as never}
            type={numberOnly ? "number" : "text"}
            {...inputProps}
          />
          {suffix && <div className="text-[11px] ">{suffix}</div>}
        </div>
        {helperText ? (
          <div className="flex items-center space-x-2">
            <ErrorIcon color="#DC362E" width={12} height={12} />
            <p
              className={textFieldStyles.helperText({
                className: helperTextClassName,
              })}
              {...helperTextProps}
            >
              {helperText}
            </p>
          </div>
        ) : null}
      </div>
    );
  },
);

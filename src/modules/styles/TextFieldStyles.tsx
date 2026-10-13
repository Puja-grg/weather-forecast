import { type VariantProps, tv } from "tailwind-variants";

export const createTextFieldStyles = tv({
  slots: {
    root: "h-[3rem] lg:h-[4rem] w-full",
    label: "text-[#00244C] font-system text-[10px] lg:text-[12px]  ",
    inputContainer:
      "bg-transparent rounded-md flex w-full overflow-hidden border items-center flex-shrink-0",
    input:
      " disabled:cursor-not-allowed placeholder:text-[#909090] text-[#000000] font-system text-[10px] lg:text-[11px] font-normal outline-none leading-none bg-transparent w-full  p-1",
    helperText: " text-[10px] lg:text-[12px] font-system",
  },
  variants: {
    size: {
      default: {
        input: "p-1.5 lg:p-2",
      },
      compact: {
        input: "px-2 py-1 lg:py-2 lg:px-3",
      },
    },
    error: {
      true: {
        inputContainer:
          "!border-red-800 !focus-within:border-red-600 !focus-within:ring-1 !focus-within:ring-red-600 !placeholder-red-800",
        helperText: "!text-red-500 ",
        input: "caret-red-500 placeholder-red-800 text-red-500",
        label: "caret-red-500 text-red-500",
      },
      false: {
        inputContainer:
          "border-[#909090] focus-within:border-[1px] focus-within:border-[#077BFF] focus-within:ring-1 focus-within:ring-[#077BFF]",
        helperText: "text-error",
      },
    },
  },
  defaultVariants: {
    size: "default",
    error: false,
  },
});

export type TextFieldVariants = VariantProps<typeof createTextFieldStyles>;

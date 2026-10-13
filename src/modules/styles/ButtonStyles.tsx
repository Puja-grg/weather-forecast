import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "group flex  px-[10px] items-center border-2 justify-center gap-2 rounded-[4px] font-system  font-semibold text-md transition-all duration-400 focus:outline-none ",
  variants: {
    color: {
      primary:
        "bg-base-primary overflow-hidden border-2 border-transparent  text-white relative ",
      lightBlue: "bg-primary-600 border-primary-600 text-white",
      skyBlue: "bg-primary-400 text-white border-none",
      blue: "bg-primary-200 border-primary-200 text-primary-600",
      destructive: "bg-error border-error text-white",
      babyBlue: "bg-[#E0EEFF] border border-[#077BFF] text-[#077BFF]",
      success: "bg-success text-white border-none",
      neutral: "bg-[#00418A] text-white rounded-[3.32px] border-none",
      lightRed: "bg-[#F56060] text-white rounded-md border-none",
      secondary:
        "border overflow-hidden  border-base-primary text-primary bg-transparent relative before:transition-color duration-[2s] before:absolute before:bg-primary-200 before:w-[200px] before:h-[200px] before:z-[-1] before:top-[-50%] before:right-[130%] before:rotate-[45deg] group-hover:before:scale-[6] before:transition-all before:duration-[0.8s] before:linear",
    },
    size: {
      sm: "w-fit",
      md: "w-full py-2 ",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

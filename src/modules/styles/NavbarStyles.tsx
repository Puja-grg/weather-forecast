import { tv } from "tailwind-variants";

export const navBarItemHolder = tv({
  base: "text-white  flex w-full  justify-between items-center relative cursor-pointer",
  variants: {
    color: {
      active:
        "mb-[4px] bg-gradient-to-r from-[rgba(7,123,255,0.7)] to-[rgba(7,123,255,0.4)] px-1 h-[30px] rounded border border-[#64ACFF]",
      inactive: "h-[38px]   pr-[4px]",
    },
  },
  defaultVariants: {
    color: "inactive",
  },
});

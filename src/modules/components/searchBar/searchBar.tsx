import { SearchIcon } from "../../assets/icons/SearchIcon";
import type { ComponentProps, Dispatch, ChangeEvent } from "react";

interface SearchInputFieldProps extends ComponentProps<"input"> {
  value?: string;
  debouncedValue?: string;
  inputOnChange?: Dispatch<ChangeEvent<HTMLInputElement>>;
  iconClassname?: string;
}

export function SearchBar({
  value,
  inputOnChange,
  iconClassname,
  ...props
}: SearchInputFieldProps) {
  return (
    <div className="relative flex  ">
      <input
        className="border border-[#909090] focus-within:border-[1px] focus-within:border-[#077BFF] focus-within:ring-1 focus-within:ring-[#077BFF] px-3 py-1 w-96 rounded outline-none"
        placeholder="Search"
        value={value}
        type="text"
        onChange={inputOnChange}
        {...props}
      />
      <SearchIcon
        className={`absolute ${
          iconClassname ? iconClassname : "right-2"
        } top-1/2 transform -translate-y-1/2 w-5 h-5`}
        fill="#909090"
      />
    </div>
  );
}

export default SearchBar;

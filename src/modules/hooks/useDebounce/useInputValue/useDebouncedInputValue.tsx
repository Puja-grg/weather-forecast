import type { ChangeEvent, Dispatch } from "react";
import { useReducerInputValue } from "./useReducerInputValue";
import { useDebounce } from "../useDebounce";

export const useDebouncedInputValue = (
  defaultValue = "",
  delay = 300,
): [string, string, Dispatch<ChangeEvent<HTMLInputElement> | string>] => {
  const [value, handleChange] = useReducerInputValue(defaultValue);
  const debouncedValue = useDebounce(value, delay);

  return [value, debouncedValue, handleChange];
};

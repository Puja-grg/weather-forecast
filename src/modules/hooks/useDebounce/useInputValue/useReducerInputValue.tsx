import type { ChangeEvent } from "react";
import { useReducer } from "react";

export function useReducerInputValue(defaultValue = "") {
  return useReducer((_: string, e: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === "string") return e;

    return e.target.value;
  }, defaultValue);
}

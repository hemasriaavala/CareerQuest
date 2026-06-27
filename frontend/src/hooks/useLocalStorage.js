import { useState } from "react";

function useLocalStorage(
  key,
  initialValue
) {
  const [value, setValue] =
    useState(() => {
      const item =
        localStorage.getItem(key);

      return item
        ? JSON.parse(item)
        : initialValue;
    });

  const saveValue = (
    newValue
  ) => {
    setValue(newValue);

    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  };

  return [
    value,
    saveValue,
  ];
}

export default useLocalStorage;
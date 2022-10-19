import React, { useCallback, useState } from "react";

type onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;

const useInput = (initialData = "") => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);
  return [value, handler, setValue] as [string, onChangeType, typeof setValue];
};

export default useInput;

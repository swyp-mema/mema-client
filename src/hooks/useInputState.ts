import { useState, useCallback, Dispatch, SetStateAction } from 'react';

interface UseInputStateParams {
  validate?: (value: string) => boolean;
}
export interface UseInputStateReturn {
  value: string;
  isFocused: boolean;
  isEmpty: boolean;
  isError: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (newValue: string) => void;
  setValue: Dispatch<SetStateAction<any>>;
}

export const useInputState = ({ validate }: UseInputStateParams = {}): UseInputStateReturn => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isEmpty = value.trim() === '';
  const isError = validate ? !validate(value) : false;

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleChange = useCallback((newValue: string) => setValue(newValue), []);

  return {
    value,
    isFocused,
    isEmpty,
    isError,
    handleFocus,
    handleBlur,
    handleChange,
    setValue,
  };
};

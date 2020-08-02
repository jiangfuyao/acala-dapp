import React, { FC, ChangeEventHandler, useState, useEffect, forwardRef, useCallback, useMemo, useRef, FocusEventHandler } from 'react';
import clsx from 'clsx';
import { noop } from 'lodash';
import './NumberInput.scss';

const NUMBER_PATTERN = '^[0-9]*(\\.)?[0-9]*$';
const numberReg = new RegExp(NUMBER_PATTERN);

const getValidNumber = (input: string, min?: number, max?: number): [boolean, string] => {
  if (numberReg.test(input)) {
    const _num = Number(input);

    if (min !== undefined && _num < min) {
      input = String(min);
    }

    if (max !== undefined && _num > max) {
      input = String(max);
    }

    return [true, input];
  }

  return [false, ''];
};

export interface NumberInputProps {
  className?: string;
  value?: number | string;
  onChange?: (value: number) => any;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
}

export const NumberInput: FC<NumberInputProps> = forwardRef<HTMLInputElement, NumberInputProps>(({
  className,
  disabled,
  id,
  name,
  max = Number.MAX_VALUE,
  min = 0,
  onBlur,
  onChange,
  onFocus,
  placeholder = '0.0',
  value
}, ref) => {
  const [_value, setValue] = useState<string>('');
  const valueRef = useRef<string>('');
  const isControlled = useMemo<boolean>((): boolean => value !== undefined, [value]);

  const _onChange = useMemo(() => onChange || noop, [onChange]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((originEvent) => {
    const [isValidNumber, validNumber] = getValidNumber(originEvent.currentTarget.value, min, max);

    // trigger value change event when is a valid number and is changed, otherwise do nothing
    if (isValidNumber && valueRef.current !== validNumber) {
      setValue(validNumber);
      valueRef.current = validNumber;
      _onChange(Number(validNumber));
    }
  }, [setValue, _onChange, min, max]);

  useEffect(() => {
    if ((value === 0 || value === '0') && isControlled) {
      setValue('');
      valueRef.current = '';

      return;
    }

    const [isValidNumber, validNumber] = getValidNumber(String(value), min, max);

    if (isValidNumber && isControlled) {
      setValue(validNumber);
      valueRef.current = validNumber;
    }
  }, [value, isControlled, max, min]);

  return (
    <input
      autoComplete='off'
      className={clsx('aca-number-input', className)}
      disabled={disabled}
      id={id}
      inputMode='decimal'
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
      onFocus={onFocus}
      pattern={NUMBER_PATTERN}
      placeholder={placeholder}
      ref={ref as any}
      value={_value}
    />
  );
});

NumberInput.displayName = 'NumberInput';

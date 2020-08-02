import React, { FC, FocusEventHandler, useState, ReactNode, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { FormikErrors } from 'formik';

import { CurrencyId } from '@acala-network/types/interfaces';
import { useApi } from '@acala-dapp/react-hooks';
import { BareProps } from '@acala-dapp/ui-components/types';
import { Button, Condition, NumberInput, NumberInputProps } from '@acala-dapp/ui-components';

import { TokenName, TokenImage } from './Token';
import { TokenSelector } from './TokenSelector';
import { getCurrencyIdFromName } from './utils';
import classes from './BalanceInput.module.scss';

type BalanceInputSize = 'large' | 'middle' | 'small';

export interface BalanceInputProps extends BareProps {
  currencies?: (CurrencyId | string)[];
  enableTokenSelect?: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  disabled?: boolean;
  onChange?: (value: number) => void;
  onTokenChange?: (token: CurrencyId) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  token: CurrencyId | string;
  tokenPosition?: 'left' | 'right';
  value?: number;
  showMaxBtn?: boolean;
  showIcon?: boolean;
  size?: BalanceInputSize;
  onMax?: () => void;
  border?: boolean;
  id?: string;
  name?: string;
  numberInputProps?: Partial<NumberInputProps>;
}

export const BalanceInput: FC<BalanceInputProps> = ({
  border = true,
  className,
  currencies,
  disabled = false,
  enableTokenSelect = false,
  error,
  id,
  name,
  numberInputProps,
  onBlur,
  onChange,
  onFocus,
  onMax,
  onTokenChange,
  placeholder,
  showIcon = true,
  showMaxBtn = false,
  size = 'large',
  token,
  tokenPosition = 'right',
  value
}) => {
  const { api } = useApi();
  const [focused, setFocused] = useState<boolean>(false);

  const _token = useMemo(() => {
    if (typeof token === 'string') return getCurrencyIdFromName(api, token);

    return token;
  }, [api, token]);

  const renderToken = useCallback((): ReactNode => {
    return (
      <Condition
        condition={enableTokenSelect}
        match={(
          <TokenSelector
            className={
              clsx(
                classes.tokenSelector,
                classes[tokenPosition],
                {
                  [classes.showIcon]: showIcon
                }
              )
            }
            currencies={currencies}
            onChange={onTokenChange}
            showIcon={showIcon}
            value={_token}
          />
        )}
        or={(
          <div className={clsx(classes.token, { [classes.showIcon]: showIcon })}>
            { showIcon ? <TokenImage currency={_token} /> : null }
            <TokenName currency={_token} />
          </div>
        )}
      />
    );
  }, [enableTokenSelect, tokenPosition, currencies, onTokenChange, showIcon, _token]);

  const _onFocus: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    setFocused(true);
    onFocus && onFocus(event);
  }, [setFocused, onFocus]);

  const _onBlur: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    setFocused(false);
    onBlur && onBlur(event);
  }, [setFocused, onBlur]);

  const rootClasses = useMemo<string>((): string => clsx(
    className,
    classes.root,
    classes[size],
    {
      [classes.disabled]: disabled,
      [classes.border]: border,
      [classes.error]: !!error,
      [classes.focused]: focused,
      [classes.showMax]: showMaxBtn,
      [classes.showIcon]: showIcon
    }
  ), [className, error, focused, size, border, showMaxBtn, showIcon, disabled]);

  return (
    <div
      className={rootClasses}
    >
      <Condition condition={tokenPosition === 'left'}>
        {renderToken}
      </Condition>
      <NumberInput
        {...numberInputProps}
        className={classes.input}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={_onBlur}
        onChange={onChange}
        onFocus={_onFocus}
        placeholder={placeholder}
        value={value}
      />
      <Condition condition={showMaxBtn}>
        <Button
          className={classes.maxBtn}
          color='primary'
          onClick={onMax}
          type='ghost'
        >
          MAX
        </Button>
      </Condition>
      <Condition condition={tokenPosition === 'right'}>
        {renderToken()}
      </Condition>
      <p className={clsx(classes.error, { [classes.show]: !!error })}>{error ? error.toString() : ''}</p>
    </div>
  );
};

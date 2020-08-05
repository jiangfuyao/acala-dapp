import React, { FC, memo, ReactElement, useContext } from 'react';

import { TagGroup, Tag } from '@acala-dapp/ui-components';
import { TagInput } from '@acala-dapp/ui-components/TagInput';

import classes from './SlippageInputArea.module.scss';
import { SwapContext } from './SwapProvider';

const SLIPPAGE_MAX = 50;
const SLIPPAGE_MIN = 0;

export const SlippageInputArea: FC<Props> = memo(() => {
  const { setSlippage, slippage } = useContext(SwapContext);
  const suggestValues = [0.001, 0.005, 0.01];
  const suggestedIndex = 1;

  const handleClick = (num: number): void => {
    setSlippage(num);
  };

  const renderSuggest = (num: number): string => {
    return `${num * 100}%${num === suggestValues[suggestedIndex] ? ' (suggested)' : ''}`;
  };

  const handleInput = (_value: number | string): void => {
    const value = Number(_value);

    setSlippage(value / 100);
  };

  return (
    <div className={classes.root}> <p className={classes.title}>Limit addtion price slippage</p>
      <TagGroup>
        {
          suggestValues.map((suggest): ReactElement => {
            return (
              <Tag
                color={slippage === suggest ? 'primary' : 'white'}
                key={`suggest-${suggest}`}
                onClick={(): void => handleClick(suggest) }
              >
                {renderSuggest(suggest)}
              </Tag>
            );
          })
        }
        <TagInput
          id='custom'
          label='%'
          max={SLIPPAGE_MAX}
          min={SLIPPAGE_MIN}
          name='custom'
          onChange={handleInput}
          placeholder='Custom'
          value={slippage}
        />
      </TagGroup>
    </div>
  );
});

SlippageInputArea.displayName = 'SlippageInputArea';

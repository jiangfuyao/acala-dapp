import React, { FC, useMemo } from 'react';
import { useLockPrices } from '@acala-dapp/react-hooks/useLockPrices';
import { Table, TableConfig } from '@acala-dapp/ui-components';
import { Token, FormatPrice, TokenImage, TokenName, TokenFullName } from '@acala-dapp/react-components';
import { Fixed18 } from '@acala-network/app-util';
import { BareProps } from '@acala-dapp/ui-components/types';
import { CurrencyLike } from '@acala-dapp/react-hooks/types';
import { ReactComponent as LockIcon } from '../../assets/lock-tag.svg';
import classes from './LockPrices.module.scss';

type PriceData = { currency: string; price: Fixed18 };

interface PriceCardProps {
  currency: CurrencyLike;
  price: Fixed18;
}

const PriceCard: FC<PriceCardProps> = ({ currency, price }) => {
  return (
    <div className={classes.priceCard}>
      <div className={classes.lockTag}><LockIcon/></div>
      <TokenImage
        className={classes.assetIcon}
        currency={currency}
      />
      <div className={classes.content}>
        <div className={classes.price}>
          <TokenName currency={currency} />
          <FormatPrice data={price} />
        </div>
        <TokenFullName
          className={classes.fullName}
          currency={currency}
        />
      </div>
    </div>
  );
};

export const LockPrices: FC<BareProps> = ({ className }) => {
  const prices = useLockPrices();

  return (
    <div className={classes.priceContainer}>
      {
        Object.keys(prices).map((currency) => {
          return (
            <PriceCard
              currency={currency}
              key={`fixed-price-${currency}`}
              price={prices[currency]}
            />
          );
        })
      }
    </div>
  );
};

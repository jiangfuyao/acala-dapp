import { getTokenName } from '@acala-dapp/react-components';
import { useTreasuryOverview } from '@acala-dapp/react-hooks';
import { Statistic } from '@acala-dapp/ui-components';
import React, { FC } from 'react';

import classes from './TreasuryOverview.module.scss';

export const TreasuryOverview: FC = () => {
  const overview = useTreasuryOverview();

  if (!overview) return null;

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Statistic title='Surplus Pool'
          value={overview.surplusPool.toNumber(2, 2)} />
      </div>
      <div className={classes.item}>
        <Statistic title='Debit Pool'
          value={overview.debitPool.toNumber(2, 2)} />
      </div>
      {overview.totalCollaterals.map((item) => {
        return (
          <div className={classes.item}
            key={`collateral-${item.currency}`}>
            <Statistic
              title={`Current Collateral(${getTokenName(item.currency)})`}
              value={item.balance.toNumber(2, 2)}
            />
          </div>
        );
      })}
    </div>
  );
};

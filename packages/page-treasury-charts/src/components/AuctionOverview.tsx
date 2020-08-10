import { useAuctionOverview } from '@acala-dapp/react-hooks';
import { Statistic } from '@acala-dapp/ui-components';
import React, { FC } from 'react';

import classes from './TreasuryOverview.module.scss';

export const AuctionOverview: FC = () => {
  const overview = useAuctionOverview();

  if (!overview) return null;

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Statistic title='Total Target Auction'
          value={overview.totalTarget.toNumber(2, 2)} />
      </div>
      <div className={classes.item}>
        <Statistic title='Total Surplus Auction'
          value={overview.totalSurplus.toNumber(2, 2)} />
      </div>
      <div className={classes.item}>
        <Statistic title='Total Debit Auction'
          value={overview.totalDebit.toNumber(2, 2)} />
      </div>
    </div>
  );
};

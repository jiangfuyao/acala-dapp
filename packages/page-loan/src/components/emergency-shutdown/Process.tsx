import React, { FC, useMemo } from 'react';
import { Progress } from 'antd';
import { useAuctionOverview } from '@acala-dapp/react-hooks';
import classes from './Process.module.scss';

export const Process: FC = () => {
  const auction = useAuctionOverview();

  const count = useMemo(() => {
    let _count = 0;

    if (!auction) return _count;

    if (auction.totalCollateral) _count += 1;

    if (auction.totalDebit) _count += 1;

    if (auction.totalSurplus) _count += 1;

    if (auction.totalTarget) _count += 1;

    return _count;
  }, [auction]);

  return (
    <div className={classes.root}>
      <p className={classes.title}>Liquidation Progress</p>
      <p className={classes.info}>Please be patient, your assets are being liquidated</p>
      <Progress
        className={classes.bar}
        percent={count / 5 * 100}
        type='circle'
      />
    </div>
  );
};

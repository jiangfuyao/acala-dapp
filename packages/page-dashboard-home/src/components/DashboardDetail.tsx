import { Statistic } from '@acala-dapp/ui-components';
import React, { FC } from 'react';

import classes from './DashboardDetail.module.scss';

const DashboardDetail: FC = () => {
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Statistic title='aUSD Issued'
          value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic title='Dex Daily Volume'
          value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic title='DOT Staked'
          value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic title='New Accounts'
          value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic title='Daily Trascation'
          value={'111111'} />
      </div>
      <div className={classes.item}>
        <Statistic title='Total Asset Locked'
          value={'111111'} />
      </div>
    </div>
  );
};

export default DashboardDetail;

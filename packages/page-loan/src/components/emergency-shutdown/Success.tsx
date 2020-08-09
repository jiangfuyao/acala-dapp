import React, { FC, useContext, useMemo } from 'react';

import { FormatBalance } from '@acala-dapp/react-components';

import { ReactComponent as SuccessIcon } from '../../assets/reclaim-success.svg';
import { EmergencyShutdownContext } from './EmergencyShutdownProvider';
import classes from './Success.module.scss';

export const Success: FC = () => {
  const { collaterals } = useContext(EmergencyShutdownContext);
  const collateralsLength = useMemo(() => Object.keys(collaterals).length, [collaterals]);

  return (
    <div className={classes.root}>
      <SuccessIcon />
      <p className={classes.title}>YOUR RECLAIM WAS SUCCESSFUL!</p>
      <p className={classes.detail}>
        You have received
        {
          Object.keys(collaterals).map((currency, index) => {
            return [
              <FormatBalance
                balance={collaterals[currency]}
                className={classes.token}
                currency={currency}
                key={`reclaim-success-${currency}`}
              />,
              index < collateralsLength - 1 ? <span key={`reclaim-success-and-${index}`}>and</span> : null
            ];
          })
        }
      </p>
    </div>
  );
};

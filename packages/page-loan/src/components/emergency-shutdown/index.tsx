import React, { FC, useContext } from 'react';
import { Card, Grid, Condition } from '@acala-dapp/ui-components';
import { Steps } from 'antd';

import { LockPrices } from './LockPrices';
import { EmergencyPrepeper } from './EmergencyPrepper';
import { EmergencyShutdownProvider, EmergencyShutdownContext } from './EmergencyShutdownProvider';
import { WithdrawNoDebitLoan } from './WithdrawNoDebitLoan';
import { RefundCollateral } from './RefundCollateral';
import { Tips } from './Tips';

// import classes from './EmergencyShutdown.module.scss';

const stepConfig = [
  {
    index: 'trigger',
    text: 'Shutdown Triggered'
  },
  {
    index: 'process',
    text: 'Liquidation'
  },
  {
    index: 'reclaim',
    text: 'Reclaim'
  }
];

export const Inner = (): JSX.Element => {
  const { step } = useContext(EmergencyShutdownContext);

  return (
    <Card>
      <Steps
        current={0}
        size='small'
      >
        <Steps.Step title='Shutdown Triggered' />
        <Steps.Step title='In Liquidation' />
        <Steps.Step title='Reclaim' />
      </Steps>
      <Tips />
      <Condition condition={step === 'trigger'}>
        <Grid container>
          <Grid item>
            <LockPrices />
          </Grid>
          <Grid item>
            <WithdrawNoDebitLoan />
          </Grid>
        </Grid>
      </Condition>
    </Card>
  );
};

export const EmergencyShutdown: FC = () => {
  return (
    <EmergencyShutdownProvider>
      <Inner/>
    </EmergencyShutdownProvider>
  );
};

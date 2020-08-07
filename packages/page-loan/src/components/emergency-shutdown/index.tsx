import React, { FC, useContext } from 'react';
import { Card, Grid, Condition } from '@acala-dapp/ui-components';
import { Steps } from 'antd';

import { LockPrices } from './LockPrices';
import { EmergencyShutdownProvider, EmergencyShutdownContext, StepRoute } from './EmergencyShutdownProvider';
import { WithdrawNoDebitLoan } from './WithdrawNoDebitLoan';
import { RefundCollateral } from './RefundCollateral';
import { Tips } from './Tips';
import { Controller } from './Controller';
import { Process } from './Process';

export const Inner = (): JSX.Element => {
  const { step } = useContext(EmergencyShutdownContext);

  return (
    <Card>
      <Steps
        current={StepRoute.findIndex((c) => step === c)}
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
      <Condition condition={step === 'process'}>
        <Grid container>
          <Grid item>
            <Process />
          </Grid>
        </Grid>
      </Condition>
      <Condition condition={step === 'reclaim'}>
        <Grid container>
          <Grid item>
            <RefundCollateral />
          </Grid>
        </Grid>
      </Condition>
      <Controller />
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

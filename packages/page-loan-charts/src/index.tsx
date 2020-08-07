import React, { FC } from 'react';

import { Page, Grid } from '@acala-dapp/ui-components';

import { LoanCollateralRatio } from './components/LoanCollateralRatio';
import { TotalDebitAndCollateral } from './components/TotalDebitAndCollateral';
import { LoansOverview } from './components/LoansOverview';

const PageWallet: FC = () => {
  return (
    <Page fullscreen>
      <Page.Title title='Loan Analysis' />
      <Page.Content>
        <Grid container>
          <Grid item>
            <TotalDebitAndCollateral />
          </Grid>
          <Grid
            item
            span={12}
          >
            <LoansOverview />
          </Grid>
          <Grid
            item
            span={12}
          >
            <LoanCollateralRatio />
          </Grid>
        </Grid>
      </Page.Content>
    </Page>
  );
};

export default PageWallet;

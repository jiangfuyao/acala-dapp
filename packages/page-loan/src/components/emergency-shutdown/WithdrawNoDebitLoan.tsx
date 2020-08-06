import React, { FC, useContext, useState, useEffect, ReactNode } from 'react';
import { Card, TableConfig, Table, Button, Step } from '@acala-dapp/ui-components';
import { useAllUserLoans, useConstants, filterEmptyLoan, useLoanHelper } from '@acala-dapp/react-hooks';
import { DerivedUserLoan } from '@acala-network/api-derive';
import { CurrencyId } from '@acala-network/types/interfaces';
import { Token, FormatBalance, getTokenName, TxButton } from '@acala-dapp/react-components';
import { convertToFixed18 } from '@acala-network/app-util';

import { ReactComponent as GuideBG } from '../../assets/guide-bg.svg';
import { LoanContext } from '../LoanProvider';

export const Guide: FC = () => {
  const { setCurrentTab } = useContext(LoanContext);
  const stepConfig = [
    {
      index: 'select',
      text: 'Select Collateral'
    },
    {
      index: 'generate',
      text: 'Generate aUSD'
    },
    {
      index: 'confirm',
      text: 'Confirm'
    }
  ];

  const handleStart = (): void => {
    setCurrentTab('create');
  };

  return (
    <Card
      className={classes.guide}
      contentClassName={classes.content}
    >
      <Step
        className={classes.step}
        config={stepConfig}
        current={'select'}
      />
      <GuideBG className={classes.guideBg} />
      <Button
        color='primary'
        onClick={handleStart}
        size='small'
      >
        Get Started
      </Button>
    </Card>
  );
};

export const WithdrawNoDebitLoan: FC = () => {
  const [empty, setEmpty] = useState<boolean>(true);

  const loans = useAllUserLoans();

  const tableConfig: TableConfig[] = [
    {
      align: 'left',
      dataIndex: 'token',
      /* eslint-disable-next-line react/display-name */
      render: (token: CurrencyId): ReactNode => (
        <Token currency={token} />
      ),
      title: 'Token',
      width: 1
    },
    {
      align: 'right',
      /* eslint-disable-next-line react/display-name */
      render: (data: DerivedUserLoan): ReactNode => (
        <FormatBalance
          balance={convertToFixed18(data.collaterals)}
          currency={data.token}
        />
      ),
      title: 'Collateral',
      width: 4
    },
    {
      align: 'right',
      /* eslint-disable-next-line react/display-name */
      render: (data: DerivedUserLoan): ReactNode => {
        const params = [data.token, '-' + data.collaterals, '0'];

        return (
          <TxButton
            method='adjustLoan'
            params={params}
            section='honzon'
            size='small'
          >
            Widthdraw
          </TxButton>
        );
      },
      title: '',
      width: 1
    }
  ];

  useEffect(() => {
    if (!loans) return;

    setEmpty(!filterEmptyLoan(loans).length);
  }, [loans]);

  // wait loading data
  if (empty) {
    return null;
  }

  return (
    <Card header='Free Collteral'
      padding={false}
    >
      <Table
        config={tableConfig}
        data={filterEmptyLoan(loans)}
        showHeader
      />
    </Card>
  );
};

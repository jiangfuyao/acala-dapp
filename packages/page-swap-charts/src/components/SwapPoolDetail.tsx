import React, { FC, useMemo } from 'react';

import { Table } from 'antd';
import { Card } from '@acala-dapp/ui-components';
import { useConstants, useSwapOverview } from '@acala-dapp/react-hooks';
import { Token, FormatFixed18, FormatBalance, DexExchangeRate } from '@acala-dapp/react-components';

export const SwapPoolDetail: FC = () => {
  const overview = useSwapOverview();
  const { stableCurrency } = useConstants();

  const columns = useMemo(() => {
    return [
      {
        key: 'currency',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => <Token currency={item.currency} />,
        title: 'Currency'
      },
      {
        key: 'pool_other',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            pair={[
              {
                balance: item.other,
                currency: item.currency
              },
              {
                balance: item.base,
                currency: stableCurrency
              }
            ]}
            pairSymbol='+'
          />
        ),
        title: 'Token Pair'
      },
      {
        key: 'value',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <DexExchangeRate supply={item.currency} />
        ),
        title: 'Exchange Rate'
      },
      {
        key: 'value',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatFixed18
            data={item.value}
            prefix='≈ $'
          />
        ),
        title: 'Value'
      }
    ];
  }, [stableCurrency]);

  if (!overview) return null;

  return (
    <Card
      header='Swap Pool Details'
      padding={false}
    >
      <Table
        columns={columns}
        dataSource={overview.details}
        pagination={false}
      />
    </Card>
  );
};

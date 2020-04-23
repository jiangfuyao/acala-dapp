import React, { FC, useContext, ReactNode } from 'react';

import { CurrencyId } from '@acala-network/types/interfaces';

import { Section, Card, Table, TableItem } from '@honzon-platform/ui-components';
import { SwapContext, Token, DexExchangeRate, DexPoolSize } from '@honzon-platform/react-components';

export const AllMarkets: FC = () => {
  const { supplyCurrencies, baseCurrency } = useContext(SwapContext);
  const _supplyCurrencies = supplyCurrencies.filter((item: string | CurrencyId) => item.toString() !== baseCurrency.toString());
  const tableConfig: TableItem<string | CurrencyId>[] = [
    {
      title: 'Token Pair',
      align: 'left',
      render: (token: string | CurrencyId): ReactNode => (
        <Token
          token={token}
          icon
        />
      )
    },
    {
      title: 'Market Price',
      align: 'left',
      render: (token: string | CurrencyId): ReactNode => <DexExchangeRate token={token} />
    },
    {
      title: 'Pool Size',
      align: 'left',
      render: (token: string | CurrencyId): ReactNode => <DexPoolSize token={token} />
    }
  ];

  return (
    <Section title='All Markets'>
      <Card gutter={false}>
        <Table
          config={tableConfig}
          data={_supplyCurrencies}
          showHeader
        />
      </Card>
    </Section>
  );
}
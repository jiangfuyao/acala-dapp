import React, { FC, useMemo, useState } from 'react';
import { Table } from 'antd';

import { Option } from '@polkadot/types';
import { AuctionInfo } from '@open-web3/orml-types/interfaces';
import { Card, Tabs } from '@acala-dapp/ui-components';
import { useCall, useCollateralAuctions, useConstants, useDebitAuctions, useSurplusAuction, CollateralAuction, DebitAuction, SurplusAuction } from '@acala-dapp/react-hooks';
import { Token, FormatAddress, FormatBalance, BalanceInput, TxButton, numToFixed18Inner } from '@acala-dapp/react-components';

const AuctionLastBid: FC<{ id: string }> = ({ id }) => {
  const info = useCall<Option<AuctionInfo>>('query.auction.auctions', [id]);

  if (info) {
    console.log('!!', info.toHuman());
  }

  const bid = info?.unwrapOr(null)?.bid?.unwrapOr(null);

  if (!bid) {
    return <span>-</span>;
  }

  return (
    <div>
      <FormatAddress
        address={bid[0].toString()}
        withCopy
      />
      <FormatBalance
        balance={bid[1]}
        currency='aUSD'
      />
    </div>
  );
};

const AuctionMakeBid: FC<{ id: string }> = ({ id }) => {
  const [val, setVal] = useState(0);

  return (
    <div style={{ minWidth: 200 }}>
      <BalanceInput
        onChange={setVal}
        showIcon={false}
        size='small'
        token='AUSD'
        value={val}
      />
      <TxButton
        disabled={val === 0}
        method='bid'
        params={[id, numToFixed18Inner(val)]}
        section='auction'
      >
        Bid
      </TxButton>
    </div>
  );
};

export const CollateralAuctionList: FC<{ data: CollateralAuction[]}> = ({ data }) => {
  const { stableCurrency } = useConstants();
  const columns = useMemo(() => {
    return [
      {
        key: 'id',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => item.id,
        title: 'Auction ID'
      },
      {
        key: 'owner',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatAddress
            address={item.owner}
            withCopy
          />
        ),
        title: 'owner'
      },
      {
        key: 'currency',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => <Token currency={item.currency} />,
        title: 'Currency'
      },
      {
        key: 'amount',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.amount}
            currency={item.currency}
          />
        ),
        title: 'Amount'
      },
      {
        key: 'target',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.target}
            currency={stableCurrency}
          />
        ),
        title: 'Target'
      },
      {
        key: 'start_time',
        render: (item: any): string => `#${item.startTime}`,
        title: 'Start Block'
      },
      {
        key: 'bidder',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => <AuctionLastBid id={item.id} />,
        title: 'Last Bid'
      },
      {
        key: 'bid',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => <AuctionMakeBid id={item.id} />,
        title: 'Bid'
      }
    ];
  }, [stableCurrency]);

  return (
    <Card header='Collateral Debit'>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export const DebitAuctionList: FC<{ data: DebitAuction[]}> = ({ data }) => {
  const { stableCurrency } = useConstants();
  const columns = useMemo(() => {
    return [
      {
        key: 'id',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => item.id,
        title: 'Auction ID'
      },
      {
        key: 'amount',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.amount}
            currency={stableCurrency}
          />
        ),
        title: 'Amount'
      },
      {
        key: 'fix',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.fix}
            currency={stableCurrency}
          />
        ),
        title: 'Fix Amount'
      },
      {
        key: 'start_time',
        render: (item: any): string => `#${item.startTime}`,
        title: 'Start Block'
      }
    ];
  }, [stableCurrency]);

  return (
    <Card header='Debit Auction'>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export const SurplusAuctinList: FC<{ data: SurplusAuction[] }> = ({ data }) => {
  const { stableCurrency } = useConstants();
  const columns = useMemo(() => {
    return [
      {
        key: 'id',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => item.id,
        title: 'Auction ID'
      },
      {
        key: 'amount',
        /* eslint-disable-next-line react/display-name */
        render: (item: any): JSX.Element => (
          <FormatBalance
            balance={item.amount}
            currency={stableCurrency}
          />
        ),
        title: 'Amount'
      },
      {
        key: 'start_time',
        render: (item: any): string => `#${item.startTime}`,
        title: 'Start Block'
      }
    ];
  }, [stableCurrency]);

  return (
    <Card header='Surplus Auction'>
      <Table
        columns={columns}
        dataSource={data}
      />
    </Card>
  );
};

export const AuctionList: FC = () => {
  const collateralAuctions = useCollateralAuctions();
  const debitAuctions = useDebitAuctions();
  const surplusAuctions = useSurplusAuction();

  return (
    <Tabs
      defaultKey='collateral'
      type='button'
    >
      <Tabs.Panel
        key='collateral'
        tab={`Collateral Auction (${collateralAuctions.length})`}
      >
        <CollateralAuctionList data={collateralAuctions}/>
      </Tabs.Panel>
      <Tabs.Panel
        key='debit'
        tab={`Debit Auction (${debitAuctions.length})`}
      >
        <DebitAuctionList data={debitAuctions} />
      </Tabs.Panel>
      <Tabs.Panel
        key='surplus'
        tab={`Surplus Auction (${surplusAuctions.length})`}
      >
        <SurplusAuctinList data={surplusAuctions} />
      </Tabs.Panel>
    </Tabs>
  );
};

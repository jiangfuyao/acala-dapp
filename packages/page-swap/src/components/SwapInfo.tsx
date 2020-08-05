import React, { FC, memo, useMemo, useContext } from 'react';

import { Fixed18 } from '@acala-network/app-util';
import { CurrencyId } from '@acala-network/types/interfaces';

import { Tag } from '@acala-dapp/ui-components';
import { FormatBalance, FormatRatio } from '@acala-dapp/react-components';
import { usePrice } from '@acala-dapp/react-hooks';
import { CurrencyLike } from '@acala-dapp/react-hooks/types';

import classes from './SwapConsole.module.scss';
import { SwapContext, PoolData } from './SwapProvider';

interface MarketRateProps {
  current: CurrencyLike;
  target: CurrencyLike;
}

const MarketRate: FC<MarketRateProps> = ({ current, target }) => {
  const currentPrice = usePrice(current);
  const targetPrice = usePrice(target);
  const rate = useMemo(() => {
    if (!currentPrice || !targetPrice) return Fixed18.ZERO;

    return currentPrice.div(targetPrice);
  }, [currentPrice, targetPrice]);

  return (
    <FormatBalance
      pair={[
        {
          balance: Fixed18.fromNatural(1),
          currency: current
        },
        {
          balance: rate,
          currency: target
        }
      ]}
      pairSymbol='='
    />
  );
};

interface PriceImpact {
  pool: PoolData;
  target: number;
  supply: number;
}

const PriceImpact: FC<PriceImpact> = ({ pool, supply, target }) => {
  const result = useMemo<number>(() => {
    const o = Fixed18.fromNatural(pool.supplySize).div(Fixed18.fromNatural(pool.targetSize));
    const n = Fixed18.fromNatural(pool.supplySize - supply).div(Fixed18.fromNatural(pool.targetSize + target));

    return n.sub(o).div(o).toNumber();
  }, [pool, target, supply]);

  return (
    <FormatRatio data={result > 1 ? 1 : result < -1 ? -1 : result} />
  );
};

interface Props {
  supplyCurrency: CurrencyId;
  targetCurrency: CurrencyId;
  target: number;
  supply: number;
}

export const SwapInfo: FC<Props> = memo(({
  supply,
  supplyCurrency,
  target,
  targetCurrency
}) => {
  const {
    pool,
    slippage
  } = useContext(SwapContext);

  const atLeast = useMemo((): Fixed18 | number => {
    const num = Fixed18.fromNatural(target).div(Fixed18.fromNatural(1 + slippage));

    return num.isNaN() ? 0 : num;
  }, [target, slippage]);

  return (
    <div className={classes.swapInfoRoot}>
      <p>
        You are selling
        <Tag>
          <FormatBalance balance={supply}
            currency={supplyCurrency} />
        </Tag>
        for at least
        <Tag>
          <FormatBalance
            balance={atLeast}
            currency={targetCurrency}
          />
        </Tag>
      </p>
      <p>
        The Current Market Price is <MarketRate
          current={supplyCurrency}
          target={targetCurrency}
        />
      </p>
      <p>
        Price Impact
        <Tag>
          <PriceImpact
            pool={pool}
            supply={supply}
            target={target}
          />
        </Tag>
      </p>
    </div>
  );
});

SwapInfo.displayName = 'SwapInfo';

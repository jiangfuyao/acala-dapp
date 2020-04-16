import { Codec } from '@polkadot/types/types';
import { CurrencyId } from '@acala-network/types/interfaces';
import { Fixed18 } from '@acala-network/app-util';
import { TimestampedValue } from '@orml/types/interfaces';
import { ApiPromise } from '@polkadot/api';

export const formatCurrency = (currency: CurrencyId | string, upper = true): string => {
  const inner = currency.toString();

  return upper ? inner.toUpperCase() : inner.toLowerCase();
};

export const formatBalance = (balance: Fixed18 | Codec | number): Fixed18 => {
  let inner = Fixed18.ZERO;

  if (typeof balance === 'number') {
    inner = Fixed18.fromNatural(balance);
  } else if (balance instanceof Fixed18) {
    inner = balance;
  } else {
    inner = Fixed18.fromParts(balance.toString());
  }

  return inner;
};

export const numToFixed18Inner = (num: number | string): string => {
  return Fixed18.fromNatural(num).innerToString();
};

export const tokenEq = (base: CurrencyId | string, target: CurrencyId | string): boolean => {
  return base.toString().toUpperCase() === target.toString().toUpperCase();
};

// FIXME: a trick to get value from TimestampedValue, need to fix
export const getValueFromTimestampValue = (origin: TimestampedValue): Codec => {
  if (Reflect.has(origin.value, 'value')) {
    return (origin.value as any).value;
  }

  return origin.value;
};

export const getAllCurrencyIds = (api: ApiPromise): CurrencyId[] => {
  const tokenList = api.registry.createType('CurrencyId' as any).defKeys as string[];

  return tokenList.map((name: string): CurrencyId => {
    return api.registry.createType('CurrencyId' as any, name) as CurrencyId;
  });
};

export const getCurrencyIdFromName = (api: ApiPromise, name: string): CurrencyId => {
  const CurrencyId = api.registry.createType('CurrencyId' as any);

  return new CurrencyId(name);
};

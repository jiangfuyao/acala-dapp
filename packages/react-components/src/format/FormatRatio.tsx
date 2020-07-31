import React, { FC, useMemo } from 'react';
import { FormatNumber, FormatNumberProps } from './FormatNumber';
import { Fixed18 } from '@acala-network/app-util';

const FormatRatioConfig: FormatNumberProps['formatNumberConfig'] = {
  decimalLength: 2,
  removeEmptyDecimalParts: true,
  removeTailZero: true
};

export const FormatRatio: FC<FormatNumberProps> = (props) => {
  const _data = useMemo(() => {
    return (props.data instanceof Fixed18 ? props.data : Fixed18.fromNatural(props.data || 0)).mul(Fixed18.fromNatural(100));
  }, [props.data]);

  return (
    <FormatNumber
      data={_data}
      formatNumberConfig={FormatRatioConfig}
      suffix={_data.isFinity() ? '%' : ''}
      {...props}
    />
  );
};

import * as dayjs from 'dayjs';
import { Column, PropertyType } from './types';

type ClassNames = (string | true | false)[];

export const cn = (...classnames: ClassNames) => classnames.filter((item) => !!item).join(' ');

export const propertyTypesMapping: Record<Column, PropertyType> = {
  amount: 'number',
  balance: 'number',
  data: 'string',
  description: 'string',
  payee: 'string',
  processDate: 'date',
  transactionDate: 'date',
  memo: 'string',
  isClear: 'boolean',
};

const stringToDate = (value: string): string => dayjs(value).format('DD.MM.YYYY');

const numberToMoney = (value: number, decimalPlaces = 2) =>
  `${value?.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })}`;

export const convertValue = (
  value: string | number | boolean,
  type: PropertyType
): { displayValue: string; copyValue: string } => {
  const mapping = {
    number: (value: string) => ({
      displayValue: numberToMoney(Number(value)),
      copyValue: value.toString(),
    }),
    string: (value = '') => ({
      displayValue: value,
      copyValue: value,
    }),
    date: (value = '') => ({
      displayValue: stringToDate(value),
      copyValue: stringToDate(value),
    }),
    boolean: (value: string) => ({
      displayValue: value,
      copyValue: value,
    }),
  };

  return mapping[type](value.toString());
};

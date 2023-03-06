import { Column, PropertyType, Value } from './types';

type ClassNames = (string | true | false)[];

export const cn = (...classnames: ClassNames) => classnames.filter((item) => !!item).join(' ');

const parseDate = (value: string) => {
  const [rawDate, rowTime = '00:00'] = value.split(' ');
  const [day, month, year] = rawDate.split('.');
  const [hour, minutes] = rowTime.split(':');
  const time = `${hour}:${minutes}:00`;
  const date = `${year}-${month}-${day}`;
  return new Date(`${date}T${time}`);
};

export const propertyTypesMapping: Record<Column, PropertyType> = {
  amount: 'number',
  balance: 'number',
  data: 'string',
  description: 'string',
  payee: 'string',
  processDate: 'date',
  transactionDate: 'date',
  memo: 'string',
};

export const convertValue = (
  value: string,
  type: PropertyType
): { displayValue: string; copyValue: string; value: Value } => {
  const mapping = {
    number: (value = '') => ({
      value: Number(value.replace(',', '')),
      displayValue: value,
      copyValue: value.replace(',', ''),
    }),
    string: (value = '') => ({
      value: value,
      displayValue: value,
      copyValue: value,
    }),
    date: (value = '') => ({
      value: parseDate(value),
      displayValue: value,
      copyValue: value,
    }),
  };

  return mapping[type](value);
};

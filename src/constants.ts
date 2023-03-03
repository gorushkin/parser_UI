import { Column, Property, PropertyType } from './types';

export const columns: Property[] = [
  'ACCOUNT NUMBER',
  'RECEIPT NUMBER',
  'TRANSACTION DATE',
  'PROCESS DATE',
  'CARD NUMBER',
  'TRANSACTION  NAME',
  'AMOUNT',
  'BALANCE',
  'CHANNEL',
  'REFERANCE',
  'FUNDS TRANSFER',
  'REFNO',
  'TRANSACTION ID',
  'IDENTIFICATION NUMBER',
  'TAX NUMBER',
  'D/C',
  'NARRATIVE',
  'PAYEE',
];

export const payeeColumn: Column = 'PAYEE';

export const ColumnsTypes: Record<Property, PropertyType> = {
  'ACCOUNT NUMBER': 'number',
  'RECEIPT NUMBER': 'number',
  'TRANSACTION DATE': 'date',
  'PROCESS DATE': 'date',
  'CARD NUMBER': 'number',
  'TRANSACTION  NAME': 'string',
  AMOUNT: 'number',
  BALANCE: 'number',
  CHANNEL: 'string',
  REFERANCE: 'string',
  'FUNDS TRANSFER': 'string',
  REFNO: 'number',
  'TRANSACTION ID': 'number',
  'IDENTIFICATION NUMBER': 'number',
  'TAX NUMBER': 'number',
  'D/C': 'string',
  NARRATIVE: 'string',
  'APPLIED FX RATE': 'number',
  'TRY EQUIVALENT': 'number',
  PAYEE: 'string',
};

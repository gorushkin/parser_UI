export type Value = string | Date | number;
export type Column = string;
export type Header = { key: Column; isVisible: boolean };

export interface Item {
  key: Property;
  value: Value;
  copyValue: string;
  displayValue: string;
  isVisible: boolean;
}

export type Row = Item[];

export type PropertyType = 'number' | 'date' | 'string';

export type Property =
  | 'ACCOUNT NUMBER'
  | 'RECEIPT NUMBER'
  | 'TRANSACTION DATE'
  | 'PROCESS DATE'
  | 'CARD NUMBER'
  | 'TRANSACTION  NAME'
  | 'AMOUNT'
  | 'BALANCE'
  | 'CHANNEL'
  | 'REFERANCE'
  | 'FUNDS TRANSFER'
  | 'REFNO'
  | 'TRANSACTION ID'
  | 'IDENTIFICATION NUMBER'
  | 'TAX NUMBER'
  | 'D/C'
  | 'NARRATIVE'
  | 'APPLIED FX RATE'
  | 'TRY EQUIVALENT'
  | 'PAYEE';

export type TableMode = 'groups' | 'whole';

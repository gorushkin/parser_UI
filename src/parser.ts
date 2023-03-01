type Value = string | Date | number;

export type Row = {
  key: string;
  value: Value;
  copyValue: string;
  displayValue: string;
  isVisible: boolean;
}[];

export type Rows = Row[];

type PropertyType = 'number' | 'date' | 'string';

type Property =
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
  | 'TRY EQUIVALENT';

const ColumnsTypes: Record<Property, PropertyType> = {
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
};

class Parser {
  data: string[] | null;

  constructor() {
    this.data = null;
  }

  parseLine(line: string) {
    return line.split('\t').map((item) => item.trim());
  }

  getHeaders(line: string): Row {
    return this.parseLine(line).map((item, i) => ({
      key: item.trim(),
      value: item.trim(),
      isVisible: true,
      copyValue: item.trim(),
      displayValue: item.trim(),
    }));
  }

  private parseDate(value: string) {
    const [rawDate, rowTime = '00:00'] = value.split(' ');
    const [day, month, year] = rawDate.split('.');
    const [hour, minutes] = rowTime.split(':');
    const time = `${hour}:${minutes}:00`;
    const date = `${year}-${month}-${day}`;
    return new Date(`${date}T${time}`);
  }

  private convertValue(
    value: string,
    type: PropertyType
  ): { displayValue: string; copyValue: string; value: Value } {
    const mapping = {
      number: (value: string) => ({
        value: Number(value.replace(',', '')),
        displayValue: value,
        copyValue: value.replace(',', ''),
      }),
      string: (value: string) => ({
        value: value,
        displayValue: value,
        copyValue: value,
      }),
      date: (value: string) => ({
        value: this.parseDate(value),
        displayValue: value,
        copyValue: value,
      }),
    };

    return mapping[type](value);
  }

  private getOperations(lines: string[], headers: Row): Rows {
    return lines
      .filter((item) => !!item)
      .map((row) =>
        this.parseLine(row).map((item, i) => {
          const type = ColumnsTypes[headers[i].key as Property];

          const { copyValue, value, displayValue } = this.convertValue(item, type);

          return {
            key: headers[i].key,
            copyValue,
            value,
            displayValue,
            isVisible: true,
          };
        })
      );
  }

  parse(data: string | null) {
    if (!data) return null;

    this.data = data
      .toString()
      .split('\n')
      .filter((item) => !!item);

    const rawHeaders = this.data[0];
    const rawOperations = this.data.slice(1);

    const headers = this.getHeaders(rawHeaders);
    const operations = this.getOperations(rawOperations, headers);

    return { headers, operations };
  }
}

export { Parser };

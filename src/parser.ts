import { ColumnsTypes, payeeColumn } from './constants';
import { Item, PropertyType, Property, Value, Row, Column } from './types';

class Parser {
  data: string[] | null;

  constructor() {
    this.data = null;
  }

  parseLine(line: string) {
    return line.split('\t').map((item) => item.trim());
  }

  getHeaders(line: string): Column[] {
    return this.parseLine(line).map((item) => item.trim());
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

  private getOperations(lines: string[], headers: Column[]): Row[] {
    const filteredLines = lines.filter((item) => !!item);
    const convertedLines = filteredLines.map((row) => {
      const parsedRow = this.parseLine(row);

      const convertedRow = parsedRow.reduce((acc: Row, item, i) => {
        const property = headers[i] as Property;
        const type = ColumnsTypes[property];

        const { copyValue, value, displayValue } = this.convertValue(item, type);

        const currentItem: Item = {
          key: headers[i] as Property,
          copyValue,
          value,
          displayValue,
          isVisible: true,
        };

        if (property === 'NARRATIVE') {
          const splittedValue = displayValue.split('    ');
          const payee = displayValue.includes('Referans') ? splittedValue[1].slice(1) : '';

          const payeeItem: Item = {
            key: 'PAYEE',
            copyValue: payee,
            value: payee,
            displayValue: payee,
            isVisible: true,
          };

          return [...acc, currentItem, payeeItem];
        }

        return [...acc, currentItem];
      }, []);

      console.log('convertedRows: ', convertedRow);
      return convertedRow;
    });

    return convertedLines;
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
    const headersWithExtraColumns = [...headers, payeeColumn];
    const operations = this.getOperations(rawOperations, headersWithExtraColumns);

    return { headers: headersWithExtraColumns, operations };
  }
}

export { Parser };

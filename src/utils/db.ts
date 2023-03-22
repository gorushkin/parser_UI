import { Transaction } from 'parser';
// TODO: add backups
const read = (): null | Transaction[] => {
  const data = localStorage.getItem('data');
  if (!data) return null;
  return JSON.parse(data);
};

const write = (data: Transaction[]) => {
  localStorage.setItem('data', JSON.stringify(data));
};

const readData = (name: string): null | Transaction[] => {
  const data = localStorage.getItem(name);
  if (!data) return null;
  return JSON.parse(data);
};

const writeData = (data: Transaction[], name: string) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const db = { read, write, writeData, readData };

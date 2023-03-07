import { Transaction } from 'parser';
// TODO: add backups
export const read = (): null | Transaction[] => {
  const data = localStorage.getItem('data');
  if (!data) return null;
  return JSON.parse(data);
};

export const write = (data: Transaction[]) => {
  localStorage.setItem('data', JSON.stringify(data));
};

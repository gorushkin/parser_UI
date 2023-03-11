import { Transaction } from './types';

const BASE_URL = 'http://127.0.0.1:3000';

export const getTest = async () => {
  await fetch(BASE_URL);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => resolve(res), 2000);
  // });
};

export const sendFile = async (file: File) => {
  const res = await fetch(`${BASE_URL}/file`, {
    method: 'POST',
    body: file,
  });

  return (await res.json()) as Transaction[];
};

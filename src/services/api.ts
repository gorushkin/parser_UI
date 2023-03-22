import { FileResponse, Statement } from '../types';

const BASE_URL = 'http://127.0.0.1:3000';

type Route = 'files' | 'root' | 'statement';

const ROUTE: Record<Route, string> = {
  files: '/files',
  root: '/',
  statement: '/statement',
};

const getRoute = (route: Route, id?: string) =>
  id ? `${BASE_URL}${ROUTE[route]}/${id}` : `${BASE_URL}${ROUTE[route]}`;

export const getTest = async () => {
  await fetch(getRoute('root'));
};

export const sendFile = async ({
  file,
  name,
}: {
  file: File;
  name: string;
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append(name, file);
  const res = await fetch(getRoute('files'), {
    method: 'POST',
    body: formData,
  });

  return (await res.json()) as FileResponse;
};

export const getFiles = async () => {
  const res = await fetch(getRoute('files'));
  return await res.json();
};

export const getFile = async (filename: string) => {
  const res = await fetch(getRoute('files', filename));
  return await res.json();
};

export const updateStatement = async ({
  name,
  statement,
}: {
  name: string;
  statement: Statement;
}) => {
  const res = await fetch(getRoute('statement'), {
    method: 'POST',
    body: JSON.stringify({ name, statement }),
  });
  return await res.json();
};

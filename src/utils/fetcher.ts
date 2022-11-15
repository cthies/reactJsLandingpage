export default function fetcher(url: string, options?: RequestInit): Promise<Response> {
  const updatedOptions = options || {};
  // eslint-disable-next-line no-restricted-globals
  return fetch(url, { ...updatedOptions, headers: { ...updatedOptions.headers, 'x-shop-next': '1' } });
}

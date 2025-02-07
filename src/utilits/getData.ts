export async function getData<T>(url: string): Promise<T> {
  const response: Response | Error = await fetch(url, { method: 'GET' });
  return await response.json();
}

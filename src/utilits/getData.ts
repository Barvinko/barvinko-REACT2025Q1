export async function getData<T>(url: string): Promise<T> {
  const response: Response | Error = await fetch(url, { method: 'GET' });
  if (!response) {
    throw new Error(`Error occurred!`);
  }
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

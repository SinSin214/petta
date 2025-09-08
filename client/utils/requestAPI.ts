export async function requestAPI<T>(
  route: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${route}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  }).then((res) => {
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  });
}
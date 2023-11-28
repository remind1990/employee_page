const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;

const requestQueue = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let requests = requestQueue.get(ip) || [];
  requests = requests.filter((timestamp) => timestamp > now - WINDOW_MS);

  if (requests.length >= MAX_REQUESTS) {
    return false;
  }

  requests.push(now);
  requestQueue.set(ip, requests);

  return true;
}

const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000; // 1 minute

const requestQueue = new Map();

export function checkRateLimit(ip) {
  const now = Date.now();
  let requests = requestQueue.get(ip) || [];

  // Remove expired requests
  requests = requests.filter((timestamp) => timestamp > now - WINDOW_MS);

  if (requests.length >= MAX_REQUESTS) {
    return false; // Request limit exceeded
  }

  requests.push(now);
  requestQueue.set(ip, requests);

  return true; // Request allowed
}

// Small fetch wrapper + token helpers for the VSCF backend API.
// See scratchpad/api-contract.md ("Frontend conventions").

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

const TOKEN_KEY = 'vscf_token';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* storage unavailable */
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
}

/**
 * api('/api/auth/login', { method: 'POST', body: {...}, auth: true })
 * Resolves with the parsed JSON body; throws Error(message) on non-2xx
 * (using the server's `error` field when present) or on network failure.
 * The thrown error carries `status` (0 for network failures).
 */
export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    const err = new Error('Cannot reach server. Please check your connection and try again.');
    err.status = 0;
    throw err;
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty or non-JSON body */
  }

  if (!res.ok) {
    const err = new Error((data && data.error) || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

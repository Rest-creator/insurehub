// Utility for refreshing JWT tokens
export async function refreshTokenIfNeeded(): Promise<string | null> {
  const access = localStorage.getItem('access');
  const refresh = localStorage.getItem('refresh');
  if (!refresh) return null;

  function isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');
      const decoded = JSON.parse(atob(payload));
      if (!decoded.exp) return true;
      return Date.now() / 1000 > decoded.exp;
    } catch {
      return true;
    }
  }

  if (access && !isTokenExpired(access)) {
    return access;
  }

  // Try to refresh
  try {
    const response = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });
    const data = await response.json();
    if (response.ok && data.access) {
      localStorage.setItem('access', data.access);
      return data.access;
    } else {
      // Refresh failed, force logout
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return null;
    }
  } catch {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return null;
  }
}

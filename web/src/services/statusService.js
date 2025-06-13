const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export async function fetchStatuses() {
  const res = await fetch(`${API_BASE_URL}/api/statuses`);
  if (!res.ok) {
    throw new Error('Failed to fetch statuses');
  }
  return res.json();
}

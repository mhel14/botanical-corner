const accessTokenKey = 'accessToken';
const accessRole = 'accessRole';

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export function getAccessRole() {
  return localStorage.getItem(accessRole);
}

export async function login(username: string, password: string) {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  if (response.ok) {
    const {token, role} = await response.json();
    localStorage.setItem(accessTokenKey, token);
    localStorage.setItem(accessRole, role);
  }
  return response.ok;
}

export function loggedIn() {
  return !!localStorage.getItem(accessTokenKey);
}

export function isAdmin() {
  return localStorage.getItem(accessRole) === 'Admin';
}

export function logout() {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(accessRole);
}

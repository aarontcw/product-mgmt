export function setAuth(token: string, role: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
}
export function isAdmin() { return localStorage.getItem('role') === 'ADMIN'; }
export function logout() { localStorage.removeItem('token'); localStorage.removeItem('role'); }
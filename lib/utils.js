export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeString(str) {
  if (!str) return null;
  return str.trim();
}

export function getClientIP(request) {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-client-ip') || 
         'unknown';
}
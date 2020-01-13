export const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5090'
    : `${window.location.protocol}//${window.location.host}/api`;

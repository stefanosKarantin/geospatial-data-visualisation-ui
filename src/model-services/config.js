export const accessPoint = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : `${window.location.protocol}//${window.location.host}/api`;

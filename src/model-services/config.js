export const accessPoint = process.env.NODE_ENV === 'development'
    ? 'localhost:5000'
    : `${window.location.protocol}//${window.location.host}/api`;

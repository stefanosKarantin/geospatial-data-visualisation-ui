import { useEffect } from 'react';

export const ComponentDidMount = callback => {
  useEffect(callback, []);
};

export const ComponentDidUpdate = (callback, deps) => {
    useEffect(callback, deps);
};

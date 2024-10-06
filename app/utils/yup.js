import { object } from 'dot-object';

export const parseYupError = (error) => {
  const message = {};
  error.inner.forEach((err) => {
    if (!message[err.path]) {
      message[err.path] = err.message;
    }
  });

  return object(message);
};

export const isYupError = (error) => error?.name === 'ValidationError';

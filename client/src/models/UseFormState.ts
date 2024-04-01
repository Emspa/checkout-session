import { useState } from 'react';

export const useFormState = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  return { email, setEmail, password, setPassword, error, setError };
};
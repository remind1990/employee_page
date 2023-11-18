'use client';

import { AuthProvider } from '../contexts/authContext';

export function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

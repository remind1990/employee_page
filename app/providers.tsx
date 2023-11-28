'use client';

import { AuthProvider } from '../contexts/authContext';

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}

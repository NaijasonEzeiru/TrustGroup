import { AuthProvider } from '@/components/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

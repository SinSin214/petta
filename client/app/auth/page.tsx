import { AuthPanel } from '@/components/Auth/AuthPanel';
import { AUTH_MODE, type AuthMode } from '@/constants/auth';

type AuthPageProps = {
  searchParams?: Promise<{ mode?: string }>;
};

const normalizeMode = (mode?: string): AuthMode => {
  if (mode === AUTH_MODE.SIGNUP) {
    return AUTH_MODE.SIGNUP;
  }

  if (mode === AUTH_MODE.FORGOT) {
    return AUTH_MODE.FORGOT;
  }

  return AUTH_MODE.LOGIN;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const initialMode = normalizeMode(params?.mode);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-28">
      <section className="mx-auto flex max-w-6xl items-center justify-center">
        <AuthPanel initialMode={initialMode} />
      </section>
    </main>
  );
}

'use client';
import { Button, Input } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') return <Loading />;
  if (session && status === 'authenticated') {
    router.push('/');
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: true,
        email,
        password,
        callbackUrl: "/",
      });

      if (result?.error) {
        setLoading(false);
        setError(result.error);
      } else {
        setLoading(false);
        setSuccess(true);
        router.push('/');
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <section className='flex-grow w-screen flex justify-center items-center'>
      <div className='w-96 p-8 bg-white rounded-lg shadow-lg space-y-4 border-1 border-neutral-600 border-opacity-30'>

        <h1 className='text-2xl font-bold text-neutral-800 text-center tracking-widest'>Login</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input value={email} type='email' onChange={(e) => setEmail(e.target.value)}
            inputMode='email'
            required placeholder='👤 Email'
            classNames={{
              inputWrapper: 'w-full rounded-md border border-gray-300',
            }} />

          <Input value={password} type='password' onChange={(e) => setPassword(e.target.value)} required placeholder='🔒 Password'

            classNames={{
              inputWrapper: 'w-full rounded-md border border-gray-300',
            }} />

          <Button disabled={loading || success} isLoading={loading || success}

            type='submit' color={success ? "success" : 'primary'} className='text-neutral-50 tracking-wide text-medium font-semibold rounded-md' >
            {loading ? "loading" : 'Login'}
          </Button>

          <Link href='/forgot-password' className='text-neutral-600 text-sm text-center text-opacity-90 transition duration-300 ease-in-out hover:underline hover:font-medium'>
            Forgot password?
          </Link>

          <Link href='/register' className='text-neutral-600 text-sm text-center pt-1
          transition duration-300 ease-in-out hover:underline hover:font-medium
          '>
            Don't have an account?{" "}
            <span className='text-primary-foreground font-medium '>Sign up here</span> 🚀
          </Link>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}


        </form>
      </div>
    </section>
  );
}
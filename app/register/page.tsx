'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import Loading from '../components/Loading';
import { stat } from 'fs';
import { registerAccount } from '@/apiqueries/apiqueries';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
    setError('');
    setLoading(true);

    try {
      await registerAccount(email, password, name);
      await signIn('credentials', {
        redirect: true,
        email,
        password,
        callbackUrl: "/",
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section className='flex-grow w-screen flex justify-center items-center'>
      <div className='w-96 p-8 bg-white rounded-lg shadow-lg space-y-4 border-1 border-neutral-600 border-opacity-30'>
        <h1 className='text-2xl font-bold text-neutral-800 text-center tracking-widest'>Register</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input value={name} type='text' onChange={(e) => setName(e.target.value)}
            required placeholder='👤 Name'
            classNames={{
              inputWrapper: 'w-full rounded-md border border-gray-300',
            }} />
          <Input value={email} type='email' onChange={(e) => setEmail(e.target.value)}
            inputMode='email'
            required placeholder='👤 Email'
            classNames={{
              inputWrapper: 'w-full rounded-md border border-gray-300',
            }} />
          <Input value={password} type='password' onChange={(e) => setPassword(e.target.value)}
            required placeholder='🔒 Password'
            classNames={{
              inputWrapper: 'w-full rounded-md border border-gray-300',
            }} />
          <Button
            isLoading={loading || success}
            disabled={loading || success}
            type='submit' color={success ? "success" : "primary"} className='text-neutral-50 tracking-wide text-medium font-semibold rounded-md'
          >
            {loading ? "loading" : 'Register'}
          </Button>
          <Link href='/login' className='text-neutral-600 text-sm text-center pt-1 transition duration-300 ease-in-out hover:underline hover:font-medium'>
            Already have an account?{" "}
            <span className='text-primary-foreground font-medium '>Login here</span> 🚀
          </Link>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </form>
      </div>
    </section>
  );
}
"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { CiUser } from "react-icons/ci";
import PasswordInput from "../components/passwordInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") return <Loading />;
  if (session && status === "authenticated") {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,

      });

      if (result?.error) {
        if (result.error === "No user found") {
          setError("No user found with this email");
        } else if (result.error === "Invalid password") {
          setError("Invalid password");
        } else {
          setError(result.error);
        }

        setLoading(false);
        console.log(result);
      } else if (result?.ok) {
        setLoading(false);
        setSuccess(true);
        router.push("/");
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <section className="flex w-screen flex-grow items-center justify-center">
      <div className="w-96 space-y-4 rounded-lg border-1 border-neutral-600 border-opacity-30 bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold tracking-widest text-neutral-800">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="email"
            aria-label="email input"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            required
            placeholder="Email"
            classNames={{
              inputWrapper: "w-full rounded-md border border-gray-300",
            }}
            startContent={
              <span className="text-neutral-500">
                <CiUser />
              </span>
            }
          />

          <PasswordInput value={password} setValue={setPassword} />

          <Button
            aria-label="login button"
            disabled={loading || success}
            isLoading={loading || success}
            type="submit"
            color={success ? "success" : "primary"}
            className="rounded-md text-medium font-semibold tracking-wide text-neutral-50"
          >
            {loading ? "loading" : "Login"}
          </Button>

          <Link
            href="/forgot-password"
            className="text-center text-sm text-neutral-600 text-opacity-90 transition duration-300 ease-in-out hover:font-medium hover:underline"
          >
            Forgot password?
          </Link>

          <Link
            href="/register"
            className="pt-1 text-center text-sm text-neutral-600
          transition duration-300 ease-in-out hover:font-medium hover:underline
          "
          >
            {"Don't have an account? "}
            <span className="font-medium text-primary-foreground ">
              Sign up here
            </span>{" "}
            🚀
          </Link>
          {error && (
            <p className="text-center text-base font-medium text-red-500 ">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

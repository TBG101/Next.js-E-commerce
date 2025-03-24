"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
import Loading from "../components/Loading";
import { stat } from "fs";
import { registerAccount } from "@/apiqueries/apiqueries";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (session && status === "authenticated") {
    router.push("/");
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerAccount(email, password, name);
      await signIn("credentials", {
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
    <main>
      <section className="flex w-screen flex-grow items-center justify-center">
        <div className="w-96 space-y-4 rounded-lg border-1 border-neutral-600 border-opacity-30 bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-bold tracking-widest text-neutral-800">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="👤 Name"
              classNames={{
                inputWrapper: "w-full rounded-md border border-gray-300",
              }}
            />
            <Input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              required
              placeholder="👤 Email"
              classNames={{
                inputWrapper: "w-full rounded-md border border-gray-300",
              }}
            />
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="🔒 Password"
              classNames={{
                inputWrapper: "w-full rounded-md border border-gray-300",
              }}
            />
            <Button
              isLoading={loading || success}
              disabled={loading || success}
              type="submit"
              color={success ? "success" : "primary"}
              className="rounded-md text-medium font-semibold tracking-wide text-neutral-50"
            >
              {loading ? "loading" : "Register"}
            </Button>
            <Link
              href="/login"
              className="pt-1 text-center text-sm text-neutral-600 transition duration-300 ease-in-out hover:font-medium hover:underline"
            >
              Already have an account?{" "}
              <span className="font-medium text-primary-foreground ">
                Login here
              </span>{" "}
              🚀
            </Link>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

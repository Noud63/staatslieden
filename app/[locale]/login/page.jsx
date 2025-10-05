"use client";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CircleX } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";

const LoginPage = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

   
  const router = useRouter();

  const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const res = await signIn("credentials", {
       email,
       password,
       redirect: false,
     });

     if (res.status === 200) {
       setSuccess(true);
       setTimeout(() => {
         router.push("/");
       }, 1500);
     }

     if (!res.ok) {
       setError(true);
       setTimeout(() => {
         setError(false);
       }, 2000);
     }
   } catch (error) {
     console.log(error, { message: error.message });
   } finally {
     setEmail("");
     setPassword("");
   }
 };

  return (
    <div className="mx-auto mt-4 w-full px-4 max-xsm:px-2">
      <div className="mx-auto max-w-[620px] rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex justify-center border-b-2 border-dotted border-green-900 pb-4 text-xl font-bold">
          Log in
        </div>

        <form onSubmit={handleSubmit} className="text-black">
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-blue-900 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-blue-900 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex w-full flex-row items-center rounded-md bg-red-100 px-4 py-3">
              <CircleX size={20} color="darkred" className="mr-2" />
              <span className="text-red-800">Gebruiker bestaat niet!</span>
            </div>
          )}

          {success && (
            <div className="mb-2 flex w-full flex-row items-center rounded-md bg-green-100 px-4 py-2">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Je bent ingelogd!</span>
            </div>
          )}

          <div className="mb-4 mt-4">
            <button
              className="text-md flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-900 py-6 text-white"
              type="submit"
            >
              <SendHorizontal className="mr-2" /> Log in
            </button>
          </div>

          <div className="mt-4 flex w-full items-center gap-1 font-medium">
            Nog geen account? <ArrowRight size={16} />
            <Link href="/register">Registreer</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

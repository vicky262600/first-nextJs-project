"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(params.get("error") || "");
    setSuccess(params.get("success") || "");
  }, [params]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevents automatic redirection
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="email"
          placeholder="Email"
          required
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          required
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className={`${styles.button} ${styles.google}`}
      >
        Login with Google
      </button>
      
      <span className={styles.or}>- OR -</span>
      
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;

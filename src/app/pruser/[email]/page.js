"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useModelContext } from "../../context/Context";

export default function EmailPage({ params }) {
  const router = useRouter();
  const { setEmail } = useModelContext();
  const { email } = params;

  useEffect(() => {
    setEmail(email); // Store email in context
    router.replace("/pruser/homepage"); // Redirect without query params
  }, [router, email, setEmail]);

  return <p>Redirecting...</p>;
}

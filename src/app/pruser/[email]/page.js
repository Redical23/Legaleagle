"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { useModelContext } from "../../context/Context";

export default function EmailPage({ params }) {
  const router = useRouter();
  const { setEmail } = useModelContext();
  const [email, setEmailState] = useState("");

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params; // Unwrap params if it's a promise
      if (resolvedParams?.email) {
        setEmailState(resolvedParams.email);
        setEmail(resolvedParams.email);
        router.replace("/pruser/homepage"); // Redirect without query params
      }
    }
    getParams();
  }, [router, params, setEmail]);

  return <p>Redirecting...</p>;
}
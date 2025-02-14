"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useModelContext } from "../../context/Context";

export default function EmailPage({ params }) {
  const router = useRouter();
  const { email, setclientemail } = useModelContext();

  console.log("🚀 EmailPage Mounted");
  console.log("🔍 Params:", params);

  // Ensure params exist and extract email2 properly
  const email2 = params?.email2 ? decodeURIComponent(params.email2) : null;
  console.log("📩 Extracted email2:", email2);

  useEffect(() => {
    if (!email2) {
      console.warn("⚠️ No email2 provided in params. Skipping...");
      return;
    }

    setclientemail(email2);
    console.log("✅ Client email set in context:", email2);

    // Initialize conversation in DB and then navigate
    const initializeConversation = async () => {
      console.log("📡 Initializing conversation...");
      console.log("Lawyer:", email, "Client:", email2);

      try {
        const res = await fetch("/api/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from: email, to: email2, content: "Hello!" }),
        });

        const data = await res.json();
        console.log("📨 Server Response:", data);

        if (!res.ok) {
          console.error("❌ Failed to initialize conversation. Status:", res.status);
        } else {
          console.log("✅ Conversation initialized successfully. Redirecting...");
          router.push("/lawyer/chats");
        }
      } catch (error) {
        console.error("❌ Error initializing conversation:", error);
      }
    };

    initializeConversation();
  }, [email2, email, setclientemail, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#001845]">
      <div className="bg-[#001230] p-8 rounded-lg shadow-lg">
        <p className="text-white text-lg">Setting up your chat...</p>
      </div>
    </div>
  );
}

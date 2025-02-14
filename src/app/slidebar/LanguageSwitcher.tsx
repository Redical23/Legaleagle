"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale) => {
    router.push(`/${locale}${pathname}`);
  };

  return (
    <div className="flex gap-4">
      <button onClick={() => changeLanguage("en")}>🇬🇧 English</button>
      <button onClick={() => changeLanguage("hi")}>🇮🇳 हिंदी</button>
    </div>
  );
};

export default LanguageSwitcher;

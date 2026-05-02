"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "../lib/i18n/config";

export default function LocaleSwitcher({ currentLocale }) {
  const pathname = usePathname();

  const getLocalizedPath = (targetLocale) => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      return `/${targetLocale}`;
    }

    if (locales.includes(segments[0])) {
      segments[0] = targetLocale;
      return `/${segments.join("/")}`;
    }

    return `/${targetLocale}${pathname}`;
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={getLocalizedPath(locale)}
            className={`rounded-full px-2 py-1 text-xs font-semibold uppercase transition ${
              isActive
                ? "bg-blue-900 text-white"
                : "text-slate-500 hover:bg-blue-50 hover:text-blue-900"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";

export default function PublicHeaderLocalized({ locale, dict }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <div className="min-w-0">
          <Link href={`/${locale}`} className="block">
            <div className="text-4xl font-bold tracking-tight text-slate-950">
              {dict.brand.name}
            </div>
            <div className="mt-1 text-sm text-slate-500">
              {dict.brand.tagline}
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-blue-900">
            {dict.nav.about}
          </Link>
          <Link href="/companies" className="text-sm font-medium text-slate-700 hover:text-blue-900">
            {dict.nav.directory}
          </Link>
          <Link href="/articles" className="text-sm font-medium text-slate-700 hover:text-blue-900">
            {dict.nav.articles}
          </Link>
          <Link href="/buyers" className="text-sm font-medium text-slate-700 hover:text-blue-900">
            {dict.nav.buyers}
          </Link>
          <Link href="/manufacturers" className="text-sm font-medium text-slate-700 hover:text-blue-900">
            {dict.nav.manufacturers}
          </Link>
          <Link href="/advertise" className="text-sm font-medium text-slate-700 hover:text-blue-900">
            {dict.nav.advertise}
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-blue-900">
            {dict.nav.contact}
          </Link>
        </div>

        <LocaleSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
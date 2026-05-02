import { notFound } from "next/navigation";
import { getDictionary } from "../../lib/i18n/getDictionary";
import { isValidLocale } from "../../lib/i18n/config";
import PublicHeaderLocalized from "../../components/PublicHeaderLocalized";
import PublicFooterLocalized from "../../components/PublicFooterLocalized";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <>
      <PublicHeaderLocalized locale={locale} dict={dict} />
      {children}
      <PublicFooterLocalized dict={dict} />
    </>
  );
}
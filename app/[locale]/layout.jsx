import "../globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import LoginRegisterLogout from "@/components/LoginRegisterLogout";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// Replace hasLocale with a custom implementation
const isValidLocale = (locales, locale) => locales.includes(locale);

export default async function RootLayout({ children, params }) {

  const { locale } = await params;

  if (!isValidLocale(routing.locales, locale)) {
    notFound();
  }

  // console.log("Locales:", routing.locales);
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className="relative bg-gradient-to-r from-red-950 via-yellow-700 to-red-950">
        <div className="fixed -z-10 h-full w-full bg-[url('/images/homebg.png')] bg-cover bg-center bg-no-repeat" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <Navbar />
            <div className="w-full max-md:flex md:hidden">
              <LoginRegisterLogout />
            </div>

            <Menu />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

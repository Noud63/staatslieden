import './globals.css'
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import LoginRegisterLogout from '@/components/LoginRegisterLogout';
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  title: "Staatslieden",
  description: "Webapplicatie over de Staatsliedenbuurt, Amsterdam",
  icons: {
    icon: "/icon2.ico",
  },
  authors: {
    name: "Noud van Dun"
  }
};

export default async function RootLayout({ children}) {

 
  return (
    <html lang="en">
      <body className="relative bg-gradient-to-r from-red-950 via-yellow-700 to-red-950">
        <div className="fixed -z-10 h-full w-full bg-[url('../public/images/homebg.png')] bg-cover bg-center bg-no-repeat" />
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <div className="w-full max-md:flex md:hidden">
              <LoginRegisterLogout />
            </div>

            <Menu />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

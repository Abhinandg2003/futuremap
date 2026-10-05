import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import Preloader from "@/components/Preloader";
import { LoadingProvider } from "@/components/PreloaderContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata = {
  title: `${site.name} — ${site.tagline}`, // TODO: final SEO title
  description: "Healthcare jobs in the Gulf, Prometric exam training and admissions. Based in Kochi.", // TODO
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
  <LoadingProvider>
    <Preloader />
    <Navbar />
    <main className="pt-0">{children}</main>
    <Footer />
  </LoadingProvider>
</body>
    </html>
  );
}

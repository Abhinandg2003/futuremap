import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { LoadingProvider } from "@/components/PreloaderContext";
import { site } from "@/lib/site";

// Only the weights the site really uses (was 9, each one is a separate download).
// TODO: if you use font-bold / font-black anywhere, "700" is already included; add others only if needed.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap", // show text immediately with a fallback font, then swap
});

const description =
  "Healthcare jobs in the Gulf, Prometric exam training and admissions in India and abroad. Honest guidance from our team in Kochi."; // TODO: final copy

export const metadata = {
  metadataBase: new URL(site.url), // makes every relative URL below absolute
  title: {
    default: `${site.name} Career & Admissions | Jobs Abroad, Exam Training, Admissions`, // TODO
    template: `%s | ${site.name}`, // pages only set the first part, e.g. "About" -> "About | FutureMap"
  },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.ico",
    // TODO: add public/apple-touch-icon.png (180x180) for iPhone home-screen icons, then uncomment:
    // apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: `${site.name} Career & Admissions`,
    description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} Career & Admissions`, description, images: [site.ogImage] },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0069ff" }; // browser bar color on phones

// Structured data: helps Google show the business details. TODO: replace placeholders in lib/site.js first.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: `${site.name} Career & Admissions Network`,
  url: site.url,
  logo: `${site.url}/favicon.ico`, // TODO: a square PNG logo is better
  image: `${site.url}${site.ogImage}`,
  description,
  telephone: site.phone,
  email: site.email,
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aqua City Township, Tetracore 22, Aluva Paravoor Road",
    addressLocality: "Aluva",
    addressRegion: "Kerala",
    postalCode: "683511",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={poppins.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
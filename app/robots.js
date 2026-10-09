// app/robots.js: tells crawlers what to index and where the sitemap is
import { site } from "@/lib/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" }, // keep the form endpoint out of search
    sitemap: `${site.url}/sitemap.xml`,
  };
}
import "./globals.css";

export const metadata = {
  verification: {
    google: "M0RDBsxFR_wqP4UcumWdP-UNe_ypQMGILO1jmHvsm4c",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "404News",
  url: "https://404news.up.railway.app",
  logo: "https://404news.up.railway.app/images/404news-logo.png",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "404News",
  url: "https://404news.up.railway.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-tech min-h-screen flex flex-col">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {children}

      </body>
    </html>
  );
}
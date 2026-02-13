import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { startSyncJob } from "@/jobs/redis";

// if (process.env.NODE_ENV === "production") {
  startSyncJob();
// }

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-tech min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
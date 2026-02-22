import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { startSyncJob } from "@/server/jobs/redis";

// if (process.env.NODE_ENV === "production") {
  startSyncJob();
// }

export default function NewsLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
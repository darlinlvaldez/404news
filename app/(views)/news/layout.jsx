import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { startSyncJob } from "@/server/jobs/redis";

startSyncJob();

export const metadata = {
  icons: {
    icon: [
      {
        url: "/images/404logo.png",
        type: "image/png",
      },
    ],
  },
};

export default function NewsLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
import syncAllViews from "@/models/news/redis";

export function startSyncJob() {
  setInterval(async () => {
    try {
      console.log("🔄 Sincronizando vistas de Redis a MySQL...");
      await syncAllViews();
      console.log("✅ Sincronización completada");
    } catch (err) {
      console.error("❌ Error sincronizando vistas:", err);
    }
  }, 1000 * 5); 
}
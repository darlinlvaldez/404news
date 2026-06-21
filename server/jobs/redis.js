import syncAllViews from "../helpers/redis.js";

export function startSyncJob() {
  setInterval(async () => {
    try {
      console.log("Sincronizando vistas de Redis a MySQL...");
      await syncAllViews();
      console.log("Sincronización completada");
    } catch (err) {
      console.error("Error sincronizando vistas:", err);
    }
  }, 20 * 1000); 
}
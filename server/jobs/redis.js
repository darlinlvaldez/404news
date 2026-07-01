import syncAllViews from "../helpers/redis.js";

let started = false;

export function startSyncJob() {

  console.log("Iniciando Sync Job");

  if (started) return;

  started = true;

  setInterval(async () => {
    try {
      console.log("Sincronizando vistas de Redis a MySQL...");
      await syncAllViews();
      console.log("Sincronización completada");
    } catch (err) {
      console.error(err);
    }
  }, 1 * 60 * 1000);
}
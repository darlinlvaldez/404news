import mysql from 'mysql2/promise';
import config from '../../config.js';

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();

    console.log(
      `✅ MySQL conectado (${config.MODE}) -> ${config.DB_DATABASE}`
    );

    connection.release();
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error.message);
  }
})();

export default pool;
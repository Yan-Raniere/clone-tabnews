import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  console.log("Trazendo as variáveis de ambiente definidas:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function getDatabaseStatus() {
  const version = await query("SHOW server_version;");
  const maxConnections = await query("SHOW max_connections;");
  const usingConnections = await query(
    "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = current_database();",
  );

  return {
    version: version.rows[0].server_version,
    maxConnections: maxConnections.rows[0].max_connections,
    usingConnections: usingConnections.rows[0].count,
  };
}

export default {
  query: query,
  getDatabaseStatus: getDatabaseStatus,
};

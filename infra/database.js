import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

async function getDatabaseStatus() {
  const version = await query("SHOW server_version;");
  const maxConnections = await query("SHOW max_connections;");
  const usedConnections = await query("SELECT COUNT(*) FROM pg_stat_activity;");

  return {
    version: version.rows[0].server_version,
    maxConnections: maxConnections.rows[0].max_connections,
    usedConnections: usedConnections.rows[0].count,
  };
}

export default {
  query: query,
  getDatabaseStatus: getDatabaseStatus,
};

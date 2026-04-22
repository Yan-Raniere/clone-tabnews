import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const infos = await database.getDatabaseStatus();

  const version = infos.version;
  const maxConnections = infos.maxConnections;
  const usedConnections = infos.usedConnections;

  response.status(200).json({
    updated_at: updatedAt,
    version: version,
    max_connections: maxConnections,
    used_connections: usedConnections,
  });
}

export default status;

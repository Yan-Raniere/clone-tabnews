import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const infos = await database.getDatabaseStatus();

  const version = infos.version;
  const maxConnections = infos.maxConnections;
  const usingConnections = infos.usingConnections;

  response.status(200).json({
    updated_at: updatedAt,
    version: version,
    max_connections: maxConnections,
    using_connections: usingConnections,
  });
}

export default status;

const { sql } = require("../config/db");

const getEstados = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM EstadosPersona");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getClientes = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT c.*, e.Nombre AS estado
      FROM Clientes c
      INNER JOIN EstadosPersona e ON c.EstadoId = e.Id
    `);

    const normalized = result.recordset.map((row) => ({
      id: row.Id,
      nombre: row.Nombre,
      correo: row.Correo ?? null,
      telefono: row.Telefono ?? null,
      edad: row.Edad,
      categoria: row.Discriminator,
      matricula: row.Matricula,
      estadoId: row.EstadoId,
      estado: row.estado ?? "Activo"
    }));

    res.json(normalized);
  } catch (error) {
    console.error("Error getClientes:", error);
    res.status(500).json(error);
  }
};

const getClienteById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      message: "ID válido es requerido."
    });
  }

  try {
    const result = await sql.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT c.*, e.Nombre AS estado
        FROM Clientes c
        INNER JOIN EstadosPersona e ON c.EstadoId = e.Id
        WHERE c.Id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado."
      });
    }

    const row = result.recordset[0];

    res.json({
      id: row.Id,
      nombre: row.Nombre,
      correo: row.Correo ?? null,
      telefono: row.Telefono ?? null,
      edad: row.Edad,
      categoria: row.Discriminator,
      matricula: row.Matricula,
      estadoId: row.EstadoId,
      estado: row.estado ?? "Activo"
    });

  } catch (error) {
    console.error("Error getClienteById:", error);
    res.status(500).json(error);
  }
};

const createCliente = async (req, res) => {
  const payload = req.body || {};

  const normalized = {
    Nombre: payload.Nombre ?? payload.nombre,
    Edad: payload.Edad ?? payload.edad ?? 0,
    Correo: payload.Correo ?? payload.correo ?? null,
    Telefono: payload.Telefono ?? payload.telefono ?? null,
    EstadoId: payload.EstadoId ?? payload.estadoId ?? 1,
    Categoria: payload.Categoria ?? payload.categoria ?? "Cliente"
  };

  if (!normalized.Nombre) {
    return res.status(400).json({
      message: "El nombre es obligatorio."
    });
  }

  try {
    const pool = await sql.connect();

    const result = await pool.request()
      .input("Nombre", sql.NVarChar(100), normalized.Nombre)
      .input("Edad", sql.Int, normalized.Edad)
      .input("Correo", sql.NVarChar(100), normalized.Correo)
      .input("Telefono", sql.NVarChar(20), normalized.Telefono)
      .input("EstadoId", sql.Int, normalized.EstadoId)
      .input("Discriminator", sql.NVarChar(50), normalized.Categoria)
      .query(`
        INSERT INTO Clientes
        (
          Nombre,
          Edad,
          Correo,
          Telefono,
          EstadoId,
          Discriminator
        )
        VALUES
        (
          @Nombre,
          @Edad,
          @Correo,
          @Telefono,
          @EstadoId,
          @Discriminator
        );

        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      nombre: normalized.Nombre,
      correo: normalized.Correo,
      telefono: normalized.Telefono,
      edad: normalized.Edad,
      categoria: normalized.Categoria,
      estadoId: normalized.EstadoId
    });

  } catch (error) {
    console.error("Error createCliente:", error);

    res.status(500).json({
      message: "Error al crear cliente",
      error: error.message
    });
  }
};

const updateCliente = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const payload = req.body || {};
  const fields = Object.keys(payload).filter((key) => key.toLowerCase() !== "id");

  if (Number.isNaN(id) || fields.length === 0) {
    return res.status(400).json({ message: "ID válido y datos de actualización son requeridos." });
  }

  try {
    const request = sql.request();
    request.input("id", sql.Int, id);

    const setClause = fields
      .map((field, index) => {
        request.input(`p${index}`, String(payload[field]));
        return `${field}=@p${index}`;
      })
      .join(", ");

    await request.query(`UPDATE Clientes SET ${setClause} WHERE Id=@id`);
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCliente = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID válido es requerido." });
  }

  try {
    await sql.request().input("id", sql.Int, id).query("DELETE FROM Clientes WHERE Id=@id");
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getEstados,
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
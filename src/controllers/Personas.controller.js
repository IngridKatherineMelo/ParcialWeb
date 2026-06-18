const { sql } = require("../config/db");

const getPersonas = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Clientes");

    const normalized = result.recordset.map((row) => ({
      id: row.id ?? row.ID ?? row.Id,
      nombre: row.nombre ?? row.Nombre ?? row.NOMBRE ?? row.Name ?? row.name,
      correo:
        row.correo ?? row.Correo ?? row.EMAIL ?? row.Email ?? row.email ?? null,
      telefono:
        row.telefono ?? row.Telefono ?? row.TELEFONO ?? row.Phone ?? row.phone ?? null,
      ...Object.fromEntries(
        Object.entries(row).filter(([k]) =>
          !["id", "ID", "Id", "nombre", "Nombre", "NOMBRE", "Name", "name", "correo", "Correo", "EMAIL", "Email", "email", "telefono", "Telefono", "TELEFONO", "Phone", "phone"].includes(k)
        )
      ),
    }));

    res.json(normalized);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPersonaById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID válido es requerido." });
  }

  try {
    const result = await sql.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Clientes WHERE id=@id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Persona no encontrada." });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createPersona = async (req, res) => {
  const payload = req.body || {};
  const fields = Object.keys(payload).filter((key) => key.toLowerCase() !== "id");

  if (fields.length === 0) {
    return res.status(400).json({ message: "Se requiere al menos un campo para crear la persona." });
  }

  try {
    const request = sql.request();
    const columns = fields.join(", ");
    const params = fields.map((field, index) => `@p${index}`).join(", ");

    fields.forEach((field, index) => {
      request.input(`p${index}`, String(payload[field]));
    });

    const query = `INSERT INTO Clientes (${columns}) VALUES (${params}); SELECT SCOPE_IDENTITY() AS id;`;
    const result = await request.query(query);
    res.status(201).json({ id: result.recordset[0].id });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePersona = async (req, res) => {
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

    await request.query(`UPDATE Clientes SET ${setClause} WHERE id=@id`);
    res.json({ id });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePersona = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID válido es requerido." });
  }

  try {
    await sql.request().input("id", sql.Int, id).query("DELETE FROM Clientes WHERE id=@id");
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
};
const sql = require("mssql");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    instanceName: process.env.DB_INSTANCE,
    encrypt: false,
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Conectado a SQL Server");
  } catch (error) {
    console.error("Error conexión DB:", error);
  }
};

module.exports = { sql, connectDB };
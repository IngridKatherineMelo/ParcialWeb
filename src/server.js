const app = require("./app");
const { connectDB } = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
};
startServer();

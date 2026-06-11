const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const clienteRoutes = require("./routes/cliente.routes");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Clientes',
      version: '1.0.0',
      description: 'API para gestionar clientes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/clientes", clienteRoutes);

app.use(express.static(path.join(__dirname, "../angular-app/dist/angular-app/browser")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../angular-app/dist/angular-app/browser/index.html"));
});

module.exports = app;
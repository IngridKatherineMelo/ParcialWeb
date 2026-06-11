const express = require("express");
const router = express.Router();

const {
  getEstados,
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} = require("../controllers/cliente.controller");

/**
 * @swagger
 * /api/clientes/estados:
 *   get:
 *     summary: Obtener todos los estados
 *     responses:
 *       200:
 *         description: Lista de estados
 */
router.get("/estados", getEstados);

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get("/", getClientes);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 */
router.get("/:id", getClienteById);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               edad:
 *                 type: integer
 *               categoria:
 *                 type: string
 *               estadoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cliente creado
 */
router.post("/", createCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               edad:
 *                 type: integer
 *               categoria:
 *                 type: string
 *               estadoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cliente actualizado
 */
router.put("/:id", updateCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cliente eliminado
 */
router.delete("/:id", deleteCliente);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
} = require("../controllers/Personas.controller");

/**
 * @swagger
 * /api/personas:
 *   get:
 *     summary: Obtener todas las personas
 *     responses:
 *       200:
 *         description: Lista de personas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   telefono:
 *                     type: string
 */
router.get("/", getPersonas);

/**
 * @swagger
 * /api/personas/{id}:
 *   get:
 *     summary: Obtener una persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 */
router.get("/:id", getPersonaById);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     summary: Crear una nueva persona
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
 *     responses:
 *       201:
 *         description: Persona creada
 */
router.post("/", createPersona);

/**
 * @swagger
 * /api/personas/{id}:
 *   put:
 *     summary: Actualizar una persona
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
 *     responses:
 *       200:
 *         description: Persona actualizada
 */
router.put("/:id", updatePersona);

/**
 * @swagger
 * /api/personas/{id}:
 *   delete:
 *     summary: Eliminar una persona
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Persona eliminada
 */
router.delete("/:id", deletePersona);

module.exports = router;
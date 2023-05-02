import express from "express";
import { createAppointment, listAppointments, updateAppointment, deleteAppointment } from "./controller.js";
import { auth } from "../../core/middlewares.js";

export const router = express.Router();

// Crear cita

router.post("/", auth, async (req, res, next) => {
  try {
    res.json(await createAppointment(req.body, req.payload));
  } catch (e) {
    next(e);
  }
});

// Ver lista de citas
router.get("/", async (req, res, next) => {
  try {
    const appointments = await listAppointments(req.query.start as string, req.query.end as string, req.payload?.id);
    res.json(appointments);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', auth, async (req, res, next) =>{
  try {
    res.json(await updateAppointment(req.params.id, req.body, req.payload))
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', auth, async (req, res, next) =>{
  try {
    await deleteAppointment(req.params, req.payload)
    res.json({})
  } catch (e) {
    next (e)
  }
})
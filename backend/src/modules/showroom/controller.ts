import express from "express";
import { ShowroomRepository } from "./repository";

const auth = require("../../middleware/auth")
const router = express.Router();
const showroomRepo = new ShowroomRepository()

router.get('', async (req, res) => {
  try {
    const showrooms = await showroomRepo.query({});
    return res.status(200).json(showrooms);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.post('', auth.isStaff, async (req, res) => {
  try {
    const data = req.body;
    const showroom = await showroomRepo.create(data);
    return res.status(200).json(showroom);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let showroom = await showroomRepo.findById(id);
    if (!showroom) {
      return res.status(400).json({"message": "Showroom not found"});
    }
    return res.status(200).json(showroom);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.put('/:id', auth.isStaff, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const showroom = await showroomRepo.update(id, data);
    return res.status(200).json(showroom);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

export {router as showroomController};
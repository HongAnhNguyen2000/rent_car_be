import express from "express";
import { ShowroomRepository } from "./repository";

const router = express.Router();
const showroomRepo = new ShowroomRepository()

router.get('', async (req, res) => {
  try {
    const showrooms = await showroomRepo.query({});
    res.status(200).json(showrooms);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.post('', async (req, res) => {
  try {
    const data = req.body;
    const showroom = await showroomRepo.create(data);
    res.status(200).json(showroom);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let showroom = await showroomRepo.findById(id);
    res.status(200).json(showroom);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const showroom = await showroomRepo.update(id, data);
    res.status(200).json(showroom);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

export {router as showroomController};
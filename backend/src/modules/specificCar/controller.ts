import express from "express";
import { SpecificCarRepository } from "./repository";

const auth = require("../../middleware/auth")
const router = express.Router();
const specificCarRepo = new SpecificCarRepository()

router.get('', auth.isStaff, async (req, res) => {
  try {
    const specificCars = await specificCarRepo.query({ relations: ['showroom', 'car'] });
    return res.status(200).json(specificCars);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.post('', auth.isStaff, async (req, res) => {
  try {
    const data = req.body;
    const specificCar = await specificCarRepo.create(data);
    return res.status(200).json(specificCar);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.get('/:id', auth.isStaff, async (req, res) => {
  try {
    const id = req.params.id;
    const specificCar = await specificCarRepo.findById(id);
    if (!specificCar) {
      return res.status(400).json({"message": "Specific car not found"});
    }
    return res.status(200).json(specificCar);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.put('/:id', auth.isStaff, async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
  
    const specificCar = await specificCarRepo.update(id, data);
    return res.status(200).json(specificCar);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

export {router as specificCarController};
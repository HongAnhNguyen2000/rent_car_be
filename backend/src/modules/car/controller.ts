import express from "express";
import { CarRepository } from "./repository";
import AppError from "../../utils/appError";

const router = express.Router();
const carRepo = new CarRepository()

router.get('', async (req, res) => {
  try {
    const cars = await carRepo.query({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.post('', async (req, res) => {
  try {
    const data = req.body;
    const car = await carRepo.create(data);
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const car = await carRepo.findById(id);
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
    const car = await carRepo.update(id, data);
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

export {router as carController};
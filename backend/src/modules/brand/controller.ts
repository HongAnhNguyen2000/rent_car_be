import express from "express";
import { BrandAgencyRepository } from "./repository";
import AppError from "../../utils/appError";

const router = express.Router();
const brandRepo = new BrandAgencyRepository()

router.get('', async (req, res) => {
  try {
    const brands = await brandRepo.query({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.post('', async (req, res) => {
  try {
    const data = req.body;
    const brand = await brandRepo.create(data);
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await brandRepo.findById(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
  
    const brand = await brandRepo.update(id, data);
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

export {router as brandAgencyController};
import express from "express";
import { BrandAgencyRepository } from "./repository";

const router = express.Router();
const brandRepo = new BrandAgencyRepository()

router.get('', async (req, res) => {
  try {
    const brands = await brandRepo.query({});
    return res.status(200).json(brands);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.post('', async (req, res) => {
  try {
    const data = req.body;
    const brand = await brandRepo.create(data);
    return res.status(200).json(brand);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await brandRepo.findById(id);
    if (!brand) {
      return res.status(400).json({"message": "Brand agent not found"});
    }
    return res.status(200).json(brand);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
  
    const brand = await brandRepo.update(id, data);
    return res.status(200).json(brand);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

export {router as brandAgencyController};
import express from "express";
import { InsuranceRepository } from "./repository";
import AppError from "../../utils/appError";

const router = express.Router();
const insuranceRepo = new InsuranceRepository()

router.get('', async (req, res) => {
  try {
    const insurances = await insuranceRepo.query({});
    res.status(200).json(insurances);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.post('', async (req, res) => {
  try {
    const data = req.body;
    const insurance = await insuranceRepo.create(data);
    res.status(200).json(insurance);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const insurance = await insuranceRepo.findById(id);
    if (!insurance) {
      return res.status(400).json({"message": "Insurance not found"});
    }
    res.status(200).json(insurance);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
  
    const insurance = await insuranceRepo.update(id, data);
    res.status(200).json(insurance);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

export {router as insurancenController};
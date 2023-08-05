import express from "express";
import { AddonRepository } from "./repository";
import AppError from "../../utils/appError";

const router = express.Router();
const addonRepo = new AddonRepository()

router.get('', async (req, res) => {
  try {
    const addons = await addonRepo.query({});
    res.status(200).json(addons);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.post('', async (req, res) => {
  try {
    const data = req.body;
    const addon = await addonRepo.create(data);
    res.status(200).json(addon);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const addon = await addonRepo.findById(id);
    res.status(200).json(addon);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
  
    const addon = await addonRepo.update(id, data);
    res.status(200).json(addon);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

export {router as addonController};
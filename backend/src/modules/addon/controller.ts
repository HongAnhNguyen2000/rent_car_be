import express from "express";
import { AddonRepository } from "./repository";

const auth = require("../../middleware/auth")
const router = express.Router();
const addonRepo = new AddonRepository()

router.get('', async (req, res) => {
  try {
    const addons = await addonRepo.query({});
    return res.status(200).json(addons);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.post('', auth.isStaff, async (req, res) => {
  try {
    const data = req.body;
    const addon = await addonRepo.create(data);
    return res.status(200).json(addon);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const addon = await addonRepo.findById(id);
    if (!addon) {
      return res.status(400).json({"message": "Addon not found"});
    }
    return res.status(200).json(addon);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.put('/:id', auth.isStaff, async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
  
    const addon = await addonRepo.update(id, data);
    return res.status(200).json(addon);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

export {router as addonController};
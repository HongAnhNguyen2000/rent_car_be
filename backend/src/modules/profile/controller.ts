import express from "express";
import { ProfileRepository } from "./repository";

const router = express.Router();
const profileRepo = new ProfileRepository();

router.get('', async (req, res) => {
  try {
    const profile = await profileRepo.query({});
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.post('/', async (req, res, next) => {
  try {
      const data = req.body;
      if (!data.userId) {
          res.status(400).json({ "message": "Please provide your id" })
          next()
      }
    const profile = await profileRepo.create(data);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await profileRepo.findById(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const profile = await profileRepo.update(id, data);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

export {router as profileController};
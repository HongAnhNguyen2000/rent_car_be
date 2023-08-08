import express from "express";
import { ProfileRepository } from "./repository";
import { User } from "../../entities/user";

const auth = require("../../middleware/auth");
const router = express.Router();
const profileRepo = new ProfileRepository();

router.get('', auth.isAuthenticated, async (req, res) => {
  try {
    const user = req.user as User;
    const profile = await profileRepo.findByUserId(user.id);
    res.status(200).json(profile);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.post('', auth.isStaff, async (req, res, next) => {
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

router.get('/:id', auth.isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await profileRepo.findById(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

router.put('/:id', auth.isAuthenticated, async (req, res) => {
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
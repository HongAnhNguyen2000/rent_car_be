import express from "express";
const router = express.Router();

router.get('', (req, res) => {
  res.send("list car")
});

export {router as carController};
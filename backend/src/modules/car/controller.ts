import express from "express";
import { CarRepository } from "./repository";
import { fileUpload } from "../../services/fileService";
import { CarImageRepository } from "../carImage/repository";
const carService = require("./service");

const router = express.Router();
const carRepo = new CarRepository();
const carImgRepo = new CarImageRepository();

router.get('', async (req, res) => {
  try {
    const cars = await carRepo.getAll();
    const result = {
      maxPage: 1,
      cars: cars
    }
    res.status(200).json(result);
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
    const car = await carRepo.getById(id);
    if (!car) {
      return res.status(400).json({"message": "Car is not exist"});
    }

    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({"message": error});
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

router.post('/:id/image', fileUpload.array("images"), async (req, res) => {
  try {
    const id = req.params.id;
    const images = req.files;

    const carItem = await carRepo.findById(id);
    if (!carItem) {
      return res.status(400).json({"message": "Car is not exist"});
    }

    if (!images) {
      return res.status(400).json({"message": "No image file provided"});
    }

    const urls = await carService.uploadFiles(images, "cars");
    const result = [];
    const carId = carItem["id"]
    for (const item of urls) {
      let carImg = {
        car: carId,
        type: 0,
        link: item,
      }
      let carImgItem = await carImgRepo.create(carImg);
      result.push(carImgItem);
    }

    return res.status(200).json({result});
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.delete('/image/:carImgId', async (req, res) => {
  try {
    const carImgId = req.params.carImgId;
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({"message": error});
  }
});

export {router as carController};
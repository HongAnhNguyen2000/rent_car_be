import express from "express";
import { BookingRepository } from "./repository";
import { CustomerRepository } from "../customer/repository";
import { User } from "../../entities/user";

const auth = require("../../middleware/auth")
const bookingService = require("./service")
const router = express.Router();
const bookingRepo = new BookingRepository()
const customerRepo = new CustomerRepository();


router.get('', auth.isCustomer, async (req, res) => {
  try {
    const user = req.user as User;
    const customer = await customerRepo.getByUserId(user.id);
    const bookings = await bookingRepo.getByCustomerId(customer.id);
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.post('', auth.isCustomer, async (req, res) => {
  try {
    const user = req.user as User;
    const booking = await bookingService.createBooking(user, req.body);
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.get('/:id', auth.isCustomer, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user as User;
    const customer = await customerRepo.getByUserId(user.id);
    const booking = await bookingRepo.getByIdAndCustomerId(id, customer.id);
    if (!booking) {
      return res.status(400).json({"message": "Booking not found"});
    }
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

router.put('/:id', auth.isStaff, async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body;
    const booking = await bookingRepo.update(id, data);
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});


router.get('/admin/all', auth.isStaff, async (req, res) => {
  try {
    const bookings = await bookingRepo.getAllForAdmin();
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});


router.get('/admin/detail/:id', auth.isStaff, async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await bookingRepo.getById(id);
    if (!booking) {
      return res.status(400).json({"message": "Booking not found"});
    }
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json({"message": error});
  }
});

export {router as bookingController};
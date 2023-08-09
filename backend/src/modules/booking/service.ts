import moment from 'moment';
import { CustomerRepository } from "../customer/repository";
import { ProfileRepository } from "../profile/repository";
import { BookingRepository } from "./repository";
import { CarRepository } from "../car/repository";
import { BookingTypeEnum } from "../../utils/const";
import { InsuranceRepository } from '../insurance/repository';
import { AddonRepository } from '../addon/repository';

const specificCarService = require("../specificCar/service");
const bookingRepo = new BookingRepository()
const carRepo = new CarRepository();
const insuranceRepo = new InsuranceRepository();
const addonRepo = new AddonRepository();
const customerRepo = new CustomerRepository();
const profileRepo = new ProfileRepository();


const calculatorPrice = async (bookingType, car, insurance, addons, startAt, endAt) => {
    try {
        const start = moment(startAt);
        const end = moment(endAt);
        let total = insurance.price;
        let price = 0;
        let timeDelta = 0;
        const duration = moment.duration(end.diff(start));

        switch (bookingType) {
            case BookingTypeEnum.ByHour:
                timeDelta = duration.asHours();
                price = car.hourlyPrice;
                break;
            case BookingTypeEnum.ByDay:
                timeDelta = duration.asDays();
                price = car.dailyPrice;
                break;
            case BookingTypeEnum.ByMonth:
                timeDelta = duration.asMonths();
                price = car.monthlyPrice;
                break;
            default:
                break;
        }

        total += price * timeDelta;
        for (const addon of addons) {
            price += addon.price;
        }

        return price;
    } catch (error) {
        throw error.message;
    }
}

exports.createBooking = async (user, data) => {
    try {
        const carValue = data.car;
        const insuranceValue = data.insurance;
        const type = data.type;
        const startAt = data.startAt;
        const endAt = data.endAt;
        const addonValues = data.addons;
        const now = moment();

        if (!carValue) {
            throw "Car is required";
        }
        if (!insuranceValue) {
            throw "Insurance is required";
        }
        if (!startAt) {
            throw "Start time is required";
        }
        if (!endAt) {
            throw "End time is required";
        }
        if (!moment(startAt).isSameOrAfter(now)) {
            throw "Start time must be greater than now";
        }
        if (!moment(endAt).isAfter(now)) {
            throw "End time must be greater than now";
        }
        if (!moment(endAt).isAfter(startAt)) {
            throw "End time must be greater than start time";
        }
        if (!Object.values(BookingTypeEnum).includes(type)) {
            throw "Booking type is invalid";
        }

        const customer = await customerRepo.getByUserId(user.id);
        const profile = await profileRepo.findByUserId(user.id);

        const insurance = await insuranceRepo.findById(insuranceValue);
        if (!insurance) {
            throw "Insurance not found";
        }

        const car = await carRepo.findById(carValue);
        if (!car) {
            throw "Car not found";
        }

        const specificCars = await specificCarService.getValidSpecificCarByCarId(
            car.id,
            new Date(startAt),
            new Date(endAt)
        );
        if (!specificCars) {
            throw "No car avaiable, please choose another car";
        }

        let addons = [];
        if (addonValues) {
            addons = await addonRepo.getByIds(addonValues);
        }

        const price = await calculatorPrice(type, car, insurance, addons, startAt, endAt);
        data = {
            ...data,
            customer: customer.id,
            specificCar: specificCars[0].id,
            insurance: insurance.id,
            addons: addons,
            pickupAt: startAt,
            driverFirstName: profile.firstName,
            driverLastName: profile.lastName,
            driverPhoneNumber: profile.phoneNumber,
            driverEmail: user.email,
            driverLicense: customer.driverLicense,
            driverFlightNumer: customer.driverFlightNumer,
            price: price,
            amount: price,
            paid: price,
        };
        return await bookingRepo.create(data);
    } catch (error) {
        throw error;
    }
}
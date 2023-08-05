import { dataSource } from '../../utils/dataSource';
import { Car } from "../../entities/car";
import { SpecificCar } from "../../entities/specificCar";
import { Booking } from '../../entities/booking';
import { Showroom } from '../../entities/showroom';
import { CarStatusEnum, Distance } from '../../utils/const';

const awsService = require("../../services/awsService");

exports.uploadFiles = async (files, folder) => {        
    const urls = [];
    try {
        for (const file of files) {
            const extension = file.originalname.split(".").pop();
            const epoch = Date.now().toString();
            const key = `${folder}/${epoch}.${extension}`;
            let url = await awsService.awsPutObject(key, file.buffer);
            urls.push(url);
        };
    } catch (error) {
        throw error;
    }
    return urls;
}

exports.getCarsWithinDistance = async(
    latitude: number,
    longitude: number,
    pickupAt: Date,
    returnAt: Date,
): Promise<Car[]> => {
    try {
        // Get list showroom in distance
        const showrooms = await dataSource
            .getRepository(Showroom)
            .createQueryBuilder('showroom')
            .select('showroom.id')
            .addSelect('showroom.latitude')
            .addSelect('showroom.longitude')
            .where(
                `(6371 * acos(cos(radians(:latitude)) * cos(radians(showroom.latitude)) * cos(radians(showroom.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(showroom.latitude)) )) <= :distance`,
                {
                longitude: longitude,
                latitude: latitude,
                distance: Distance,
                },
            )
            .getMany();

        if (showrooms.length < 1) {
            return [];
        }
        const showroomIds = showrooms.map((showroom) => showroom.id);
        
        // Lấy list booking from pickupAt to returnAt
        const bookings = await dataSource
            .getRepository(Booking)
            .createQueryBuilder('booking')
            .select('booking.specificCar')
            .where(`(booking.startAt <= :returnAt AND booking.endAt >= :pickupAt)`, {
                pickupAt: pickupAt,
                returnAt: returnAt,
            })
            .getMany();
        const bookingSpecificCarIds = bookings.map((booking) => booking.specificCar.id);

        // Get list specific car
        const queryBuilder = await dataSource
            .getRepository(SpecificCar)
            .createQueryBuilder('specificCar')
            .leftJoinAndSelect('specificCar.car', 'car')
            .where('specificCar.showroom IN (:showroomIds)', { showroomIds: showroomIds })
            .andWhere('specificCar.status IN (:status)', { status: [CarStatusEnum.Available, CarStatusEnum.Renting] });

        if (bookingSpecificCarIds.length > 0) {
            queryBuilder.andWhere('specificCar.id NOT IN (:bookingSpecificCarIds)', { bookingSpecificCarIds: bookingSpecificCarIds });
        }
        const specificCars = await queryBuilder.getMany();
        const carIds = specificCars.map((specificCar) => specificCar.car.id);

        // Get list car
        const cars = await dataSource
            .getRepository(Car)
            .createQueryBuilder('car')
            .where('car.id IN (:carIds)', { carIds: carIds })
            .getMany();

        return cars;
    } catch (error) {
        throw error.message;
    }
}

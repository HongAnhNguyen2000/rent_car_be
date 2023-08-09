import { SpecificCar } from "../../entities/specificCar";
import { Booking } from "../../entities/booking";
import { dataSource } from "../../utils/dataSource";
import { CarStatusEnum } from "../../utils/const";

exports.getValidSpecificCarByCarId = async(
    carId: String,
    pickupAt: Date,
    returnAt: Date,
): Promise<SpecificCar[]> => {
    try {
        // Lấy list booking from pickupAt to returnAt
        const bookings = await dataSource
            .getRepository(Booking)
            .createQueryBuilder('booking')
            .select('booking.specificCar')
            .distinct(true)
            // .where(`
            //     Not(booking.startAt > :returnAt OR booking.endAt < :pickupAt)`, {
            //         pickupAt: pickupAt,
            //         returnAt: returnAt,
            // })
            // .where(`
            //     booking.startAt = :pickupAt AND booking.endAt = :returnAt`, {
            //         pickupAt: pickupAt,
            //         returnAt: returnAt,
            // })
            .where(`(booking.startAt <= :returnAt AND booking.endAt >= :pickupAt)`, {
                pickupAt: pickupAt,
                returnAt: returnAt,
            })
            .getMany();

            // .where(`
            //     (booking.startAt <= :pickupAt AND booking.endAt >= :returnAt)
            //     OR (booking.startAt >= :pickupAt AND booking.startAt <= :returnAt)
            //     OR (booking.endAt >= :pickupAt AND booking.endAt <= :returnAt)
            //     OR (booking.startAt >= :pickupAt AND booking.endAt <= :returnAt)`, {
            //         pickupAt: pickupAt,
            //         returnAt: returnAt,
        const bookingSpecificCarIds = bookings.map((booking) => booking.specificCar.id);
        console.log("bookings: ", bookings);
        
        // Get list specific car
        const queryBuilder = await dataSource
            .getRepository(SpecificCar)
            .createQueryBuilder('specificCar')
            .distinct(true)
            .where('specificCar.car = (:carId)', { carId: carId })
            .andWhere('specificCar.status IN (:status)', { status: [CarStatusEnum.Available, CarStatusEnum.Renting] });

        if (bookingSpecificCarIds.length > 0) {
            queryBuilder.andWhere('specificCar.id NOT IN (:bookingSpecificCarIds)', { bookingSpecificCarIds: bookingSpecificCarIds });
        }
        const specificCars = await queryBuilder.getMany();
        return specificCars;
    } catch (error) {
        throw error.message;
    }
}

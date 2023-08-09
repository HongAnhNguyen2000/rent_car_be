import moment from 'moment';
import { EntityRepository, Repository } from 'typeorm';
import { Booking } from '../../entities/booking';
import { dataSource } from '../../utils/dataSource';
import { BookingAddonRepository } from '../bookingAddon/repository';
import { InsuranceRepository } from '../insurance/repository';
import { SpecificCarRepository } from '../specificCar/repository';
import { CarStatusEnum } from '../../utils/const';

@EntityRepository(Booking)
export class BookingRepository{
    private bookingRepository: Repository<Booking> = null;
    private bookingAddonRepository: BookingAddonRepository;
    private specificCarRepository: SpecificCarRepository;
    constructor(
    ) {
        this.bookingRepository = dataSource.getRepository(Booking);
        this.bookingAddonRepository = new BookingAddonRepository();
        this.specificCarRepository = new SpecificCarRepository();
    }

    async query(q): Promise<Booking[]> {
        try {
            return await this.bookingRepository.find(q);
        } catch (error) {
            throw error.message;
        }
    }

    async findById(id): Promise<Booking> {
        try {
            return await this.bookingRepository.findOne({
                where: { id },
                relations: ['insurance', 'specificCar']
            });
        } catch (error) {
            throw error.message;
        }
    }

    async findByIdAndCustomerId(id, customerId): Promise<Booking> {
        try {
            return await this.bookingRepository.findOne({ 
                where: { id, customer: { id: customerId } },
                relations: ['insurance', 'specificCar']
            });
        } catch (error) {
            throw error.message;
        }
    }

    async getById(id): Promise<any> {
        try {
            let booking = await this.findById(id);
            if (booking) {
                const bookingAddons = await this.bookingAddonRepository.getByBookingId(id);
                const addonPromises = bookingAddons.map((item) => item.addon);
                Promise.all(addonPromises)
                    .then((addons) => {
                        const result = {...booking, addons: addons};
                        return result;
                    })
                    .catch((error) => {
                        throw error;
                    });
            };
            return booking;
        } catch (error) {
            throw error.message;
        }
    }

    async getByIdAndCustomerId(id, customerId): Promise<any> {
        try {
            let booking = await this.findByIdAndCustomerId(id, customerId);
            if (booking) {
                const bookingAddons = await this.bookingAddonRepository.getByBookingId(id);
                const addonPromises = bookingAddons.map((item) => item.addon);
                Promise.all(addonPromises)
                    .then((addons) => {
                        return {...booking, addons: addons};
                    })
                    .catch((error) => {
                        throw error;
                    });
                };
            return booking;
        } catch (error) {
            throw error.message;
        }
    }

    async getByCustomerId(customerId): Promise<any[]> {
        try {
            let bookings = await this.query({ 
                where: { customer: { id: customerId} },
                relations: ['insurance', 'specificCar']
            });
            const bookingPromises = bookings.map((booking) => this.getById(booking.id));
            Promise.all(bookingPromises)
                .then((data) => {
                    return data;
                })
                .catch((error) => {
                    throw error;
                });
            return bookings;
        } catch (error) {
            throw error.message;
        }
    }

    async create(data): Promise<Booking> {
        try {
            let specificCar = data.specificCar;
            const startAt = data.startAt;
            const addons = data.addons;
            const now = moment();

            const booking = await this.bookingRepository.save(data);
            if (moment(startAt).isAfter(now)) {
                specificCar = {...specificCar, status: CarStatusEnum.Renting};
                await this.specificCarRepository.update(specificCar.id, specificCar);
            }
            for (const addon of addons) {
                const payload = {
                    booking: booking.id,
                    addon: addon.id,
                    price: addon.price
                }
                await this.bookingAddonRepository.create(payload);
            }

            return await this.getById(booking.id);
        } catch (error) {
            throw error.message;
        }
    }

    async update(id, data: Partial<Booking>): Promise<any> {
        try {
            let booking = await this.findById(id)
            this.bookingRepository.merge(booking, data);
            return await this.bookingRepository.save(booking);
        } catch (error) {
            throw "Something was wrong";
        }
    }
}
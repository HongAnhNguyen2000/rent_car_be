import { EntityRepository, Repository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { BookingAddon } from '../../entities/bookingAddon';

@EntityRepository(BookingAddon)
export class BookingAddonRepository{
    private bookingAddonRepository: Repository<BookingAddon> = null;
    constructor(
    ) {
        this.bookingAddonRepository = dataSource.getRepository(BookingAddon);
    }

    async query(q): Promise<BookingAddon[]> {
        try {
            return await this.bookingAddonRepository.find(q);
        } catch (error) {
            throw error.message;
        }
    }

    async findById(id): Promise<BookingAddon> {
        try {
            return await this.bookingAddonRepository.findOne({ where: { id } });
        } catch (error) {
            throw error.message;
        }
    }

    async getByBookingId(bookingId): Promise<BookingAddon[]> {
        try {
            return await this.bookingAddonRepository.find({ 
                where: { booking: { id: bookingId } },
                relations: ['addon'],
            });
        } catch (error) {
            throw error.message;
        }
    }

    async create(bookingAddon): Promise<BookingAddon> {
        try {
            return await this.bookingAddonRepository.save(bookingAddon);
        } catch (error) {
            throw error.message;
        }
    }

    async update(id, data: Partial<BookingAddon>): Promise<any> {
        try {
            let bookingAddon = await this.findById(id)
            this.bookingAddonRepository.merge(bookingAddon, data);
            return await this.bookingAddonRepository.save(bookingAddon);
        } catch (error) {
            throw "Something was wrong";
        }
    }
}
import { EntityRepository, Repository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { Showroom } from '../../entities/showroom';
import { SpecificCar } from '../../entities/specificCar';

@EntityRepository(Showroom)
export class ShowroomRepository {
  private showroomRepository: Repository<Showroom> = null;
  private specificCarRepository: Repository<SpecificCar> = null;
  constructor(
  ) {
    this.showroomRepository = dataSource.getRepository(Showroom);
    this.specificCarRepository = dataSource.getRepository(SpecificCar);
  }

  async query(q): Promise<Showroom[]> {
    try {
        return await this.showroomRepository.find(q);
    } catch (error) {
        throw error.message;
    }
  }

  async findById(id): Promise<Showroom> {
    try {
        return await this.showroomRepository.findOne({ where: { id } });
    } catch (error) {
        throw error.message;
    }
  }

  async create(showroom): Promise<Showroom> {
    try {
        return await this.showroomRepository.save(showroom);
    } catch (error) {
        throw error.message;
    }
  }

  async update(id, data: Partial<Showroom>): Promise<any> {
    try {
        let showroom = await this.findById(id)
        this.showroomRepository.merge(showroom, data);
        return await this.showroomRepository.save(showroom);
    } catch (error) {
        throw "Something was wrong";
    }
  }

  async getByCarId(carId): Promise<Showroom[]> {
    try {
      const specificCars = await this.specificCarRepository.find({ 
        relations: ['showroom'],
        where: { car: {id: carId} }
      });

      const uniqueShowrooms = specificCars.reduce((showrooms, specificCar) => {
        const exist = showrooms.find((showroom) => showroom.id === specificCar.showroom.id);
        if (!exist) {
          showrooms.push(specificCar.showroom);
        }
        return showrooms;
      }, []);
      return uniqueShowrooms;

    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
  }
}
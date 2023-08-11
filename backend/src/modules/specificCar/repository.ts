import { EntityRepository, Repository, In, Not } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { SpecificCar } from '../../entities/specificCar';
import { CarStatusEnum } from '../../utils/const';

@EntityRepository(SpecificCar)
export class SpecificCarRepository{
  private specificCarRepository: Repository<SpecificCar> = null;
  constructor(
  ) {
    this.specificCarRepository = dataSource.getRepository(SpecificCar);
  }

  async query(q): Promise<SpecificCar[]> {
    try {
      return await this.specificCarRepository.find(q);
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id): Promise<SpecificCar> {
    try {
      return await this.specificCarRepository.findOne({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async getById(id): Promise<SpecificCar> {
    try {
      return await this.specificCarRepository.findOne({ 
        where: { id },
        relations: ["car"]
      });
    } catch (error) {
      throw error.message;
    }
  }

  async findByCarId(carId): Promise<SpecificCar[]> {
    try {
      const validStatus = [CarStatusEnum.Available, CarStatusEnum.Renting];
      return await this.query({ 
        where: { car: { id: carId }, status: In(validStatus) },
        relations: ['showroom'] }
      );
    } catch (error) {
      throw error.message;
    }
  }

  async create(specificCar): Promise<SpecificCar> {
    try {
      return await this.specificCarRepository.save(specificCar);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, data: Partial<SpecificCar>): Promise<any> {
    try {
        let specificCar = await this.findById(id)
        this.specificCarRepository.merge(specificCar, data);
        return await this.specificCarRepository.save(specificCar);
    } catch (error) {
        throw "Something was wrong";
    }
  }
}
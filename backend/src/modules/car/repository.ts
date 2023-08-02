import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Car } from '../../entities/car';
import { dataSource } from '../../utils/dataSource';
import AppError from '../../utils/appError';

@EntityRepository(Car)
export class CarRepository{
  private carRepository: Repository<Car> = null;
  constructor(
  ) {
    this.carRepository = dataSource.getRepository(Car);
  }

  async query(q): Promise<Car[]> {
    try {
      return await this.carRepository.find(q);
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id): Promise<Car> {
    try {
      return await this.carRepository.findOne({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async create(car): Promise<Car> {
    try {
      return await this.carRepository.save(car);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, data): Promise<any> {
    try {
      let car = await this.findById(id)
      car = { ...data };
      return await this.carRepository.save(car);
    } catch (error) {
      throw "Something was wrong";
    }
  }
}
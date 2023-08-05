import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Car } from '../../entities/car';
import { dataSource } from '../../utils/dataSource';
import { CarImageRepository } from '../carImage/repository';

@EntityRepository(Car)
export class CarRepository{
  private carRepository: Repository<Car> = null;
  private carImageRepository: CarImageRepository;
  constructor(
  ) {
    this.carRepository = dataSource.getRepository(Car);
    this.carImageRepository = new CarImageRepository();
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

  async getAll(): Promise<Car[]> {
    try {
      const result = [];
      const cars = await this.query({});
      for (const car of cars) {
        const img = await this.carImageRepository.getPrimaryByCarId(car.id);
        const item = { ...car, image: img ? img.link : ""};
        result.push(item);
      }      
      return result;
    } catch (error) {
      throw error.message;
    }
  }

  async getById(id: string): Promise<Car> {
    try {
      const car = await this.findById(id);
      if (!car) {
        return null;
      }

      const carImages = await this.carImageRepository.getByCarId(car.id);
      const result = { ...car, images: carImages};
      return result;
    } catch (error) {
      throw error.message;
    }
  }
}
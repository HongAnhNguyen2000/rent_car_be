import { EntityRepository, Repository } from 'typeorm';
import { Car } from '../../entities/car';
import { dataSource } from '../../utils/dataSource';
import { CarImageRepository } from '../carImage/repository';
import { ShowroomRepository } from '../showroom/repository';
import { BrandAgencyRepository } from '../brand/repository';

@EntityRepository(Car)
export class CarRepository{
  private carRepository: Repository<Car> = null;
  private carImageRepository: CarImageRepository;
  private showroomRepository: ShowroomRepository;
  private brandAgencyRepository: BrandAgencyRepository;
  constructor(
  ) {
    this.carRepository = dataSource.getRepository(Car);
    this.carImageRepository = new CarImageRepository();
    this.showroomRepository = new ShowroomRepository();
    this.brandAgencyRepository = new BrandAgencyRepository();
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

  async update(id, data: Partial<Car>): Promise<any> {
    try {
      let car = await this.findById(id);
      this.carRepository.merge(car, data);
      return await this.carRepository.save(car);
    } catch (error) {
      throw "Something was wrong";
    }
  }

  async getAll(cars): Promise<Car[]> {
    try {
      const result = [];
      for (const car of cars) {
        const agent = await this.brandAgencyRepository.findById(car.agent);
        const showrooms = await this.showroomRepository.getByCarId(car.id);
        const img = await this.carImageRepository.getPrimaryByCarId(car.id);
        const item = { ...car, agent: agent, showrooms: showrooms, image: img ? img.link : ""};
        result.push(item);
      }
      return result;
    } catch (error) {
      throw error.message;
    }
  }

  async getAllForAdmin(): Promise<Car[]> {
    try {
      const cars = await this.query({});
      return await this.getAll(cars);
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

      const agent = await this.brandAgencyRepository.findById(car.agent);
      const showrooms = await this.showroomRepository.getByCarId(car.id);
      const carImages = await this.carImageRepository.getByCarId(car.id);
      const result = { ...car, agent: agent, showrooms: showrooms, images: carImages};
      return result;
    } catch (error) {
      throw error.message;
    }
  }
}
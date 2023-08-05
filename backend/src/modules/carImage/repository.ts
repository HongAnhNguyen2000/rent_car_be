import { EntityRepository, Repository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { CarImage } from '../../entities/carImage';

@EntityRepository(CarImage)
export class CarImageRepository{
  private carImageRepository: Repository<CarImage> = null;
  constructor(
  ) {
    this.carImageRepository = dataSource.getRepository(CarImage);
  }

  async query(q): Promise<CarImage[]> {
    try {
      return await this.carImageRepository.find(q);
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id): Promise<CarImage> {
    try {
      return await this.carImageRepository.findOne({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async create(carImg): Promise<CarImage> {
    try {
      return await this.carImageRepository.save(carImg);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, data): Promise<any> {
    try {
      let carImg = await this.findById(id)
      carImg = { ...data };
      return await this.carImageRepository.save(carImg);
    } catch (error) {
      throw "Something was wrong";
    }
  }

  async getByCarId(carId: string): Promise<CarImage[]> {
    try {
      return await this.query({ where: { car: { id: carId } } });
    } catch (error) {
      throw error.message;
    }
  }

  async getPrimaryByCarId(carId: string): Promise<CarImage> {
    try {
      let primary = await this.carImageRepository.find({ where: { car: {id: carId}, type: 1 } });
      if (primary.length < 1) {
        const imgs = await this.getByCarId(carId);
        if (!imgs) {
          return null;
        }
        const item = imgs[0]
        item.type = 1
        await this.update(item.id, item)
        return item;
      }
      return primary[0];
    } catch (error) {
      throw error.message;
    }
  }
}
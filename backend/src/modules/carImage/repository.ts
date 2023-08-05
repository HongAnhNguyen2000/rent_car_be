import { EntityRepository, Repository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { CarImage } from '../../entities/carImage';
import { CarImageTypeEnum } from '../../utils/const';

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

  async update(id, data: Partial<CarImage>): Promise<any> {
    try {
      let carImg = await this.findById(id);
      this.carImageRepository.merge(carImg, data);
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
      const primaryType = CarImageTypeEnum.Primary;
      let primary = await this.carImageRepository.find({ where: { car: {id: carId}, type: primaryType } });
      if (primary.length < 1) {
        const imgs = await this.getByCarId(carId);
        if (imgs.length < 1) {
          return null;
        }

        const item = imgs[0]
        item.type = primaryType
        await this.update(item.id, item)
        return item;
      }

      return primary[0];
    } catch (error) {
      throw error.message;
    }
  }
}
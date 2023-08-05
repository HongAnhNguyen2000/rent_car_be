import { EntityRepository, Repository, QueryFailedError } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import AppError from '../../utils/appError';
import { Insurance } from '../../entities/insurance';

@EntityRepository(Insurance)
export class InsuranceRepository{
  private insuranceRepository: Repository<Insurance> = null;
  constructor(
  ) {
    this.insuranceRepository = dataSource.getRepository(Insurance);
  }

  async query(q): Promise<Insurance[]> {
    try {
      return await this.insuranceRepository.find(q);
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id): Promise<Insurance> {
    try {
      return await this.insuranceRepository.findOne({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async create(insurance): Promise<Insurance> {
    try {
      return await this.insuranceRepository.save(insurance);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, data): Promise<any> {
    try {
      let insurance = await this.findById(id)
      insurance = { ...data };
      return await this.insuranceRepository.save(insurance);
    } catch (error) {
      throw "Something was wrong";
    }
  }
}
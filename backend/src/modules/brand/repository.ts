import { EntityRepository, Repository, QueryFailedError } from 'typeorm';
import { BrandAgency } from '../../entities/brandAgency';
import { dataSource } from '../../utils/dataSource';
import AppError from '../../utils/appError';

@EntityRepository(BrandAgency)
export class BrandAgencyRepository{
  private brandAgencyRepository: Repository<BrandAgency> = null;
  constructor(
  ) {
    this.brandAgencyRepository = dataSource.getRepository(BrandAgency);
  }

  async query(q): Promise<BrandAgency[]> {
    try {
      return await this.brandAgencyRepository.find(q);
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id): Promise<BrandAgency> {
    try {
      return await this.brandAgencyRepository.findOne({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async create(BrandAgency): Promise<BrandAgency> {
    try {
      return await this.brandAgencyRepository.save(BrandAgency);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, data): Promise<any> {
    try {
      let brand = await this.findById(id)
      brand = { ...data };
      return await this.brandAgencyRepository.save(brand);
    } catch (error) {
      throw "Something was wrong";
    }
  }
}
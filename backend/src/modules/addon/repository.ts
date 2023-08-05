import { EntityRepository, Repository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { Addon } from '../../entities/addon';

@EntityRepository(Addon)
export class AddonRepository{
  private addonRepository: Repository<Addon> = null;
  constructor(
  ) {
    this.addonRepository = dataSource.getRepository(Addon);
  }

  async query(q): Promise<Addon[]> {
    try {
      return await this.addonRepository.find(q);
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id): Promise<Addon> {
    try {
      return await this.addonRepository.findOne({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async create(addon): Promise<Addon> {
    try {
      return await this.addonRepository.save(addon);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id, data: Partial<Addon>): Promise<any> {
    try {
        let addon = await this.findById(id)
        this.addonRepository.merge(addon, data);
        return await this.addonRepository.save(addon);
    } catch (error) {
        throw "Something was wrong";
    }
  }
}
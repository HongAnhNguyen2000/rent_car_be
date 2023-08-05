import { EntityRepository, Repository } from 'typeorm';
import { Showroom } from '../../entities/showroom';
import { dataSource } from '../../utils/dataSource';

@EntityRepository(Showroom)
export class ShowroomRepository {
  private showroomRepository: Repository<Showroom> = null;
  constructor(
  ) {
    this.showroomRepository = dataSource.getRepository(Showroom);
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
}
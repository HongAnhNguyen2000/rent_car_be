import { EntityRepository, Repository, Not, IsNull } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { UserRepository } from '../user/repository';
import { Staff } from '../../entities/staff';

@EntityRepository(Staff)
export class StaffRepository {
  private staffRepository: Repository<Staff> = null;
  private userRepository: UserRepository;
  constructor(
  ) {
    this.staffRepository = dataSource.getRepository(Staff);
    this.userRepository = new UserRepository();
  }

  async query(q): Promise<Staff[]> {
    try {
        return await this.staffRepository.find(q);
    } catch (error) {
        throw error.message;
    }
  }

  async findById(id): Promise<Staff> {
    try {
        return await this.staffRepository.findOne({ where: { id } });
    } catch (error) {
        throw error.message;
    }
  }

  async getByUserId(userId): Promise<Staff> {
    try {
        return await this.staffRepository.findOne({ 
            where: { user: { id: userId } }
        });
    } catch (error) {
        throw error.message;
    }
  }

  async create(data): Promise<Staff> {
    try {
        const user = await this.userRepository.create(data);
        let staff = {...data, user: user};
        return await this.staffRepository.save(staff);
    } catch (error) {
        throw error.message;
    }
  }
}
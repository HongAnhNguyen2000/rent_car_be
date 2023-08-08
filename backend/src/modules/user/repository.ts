import { EntityRepository, Repository, getRepository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { User } from '../../entities/user';
import { ProfileRepository } from '../profile/repository';

@EntityRepository(User)
export class UserRepository{
  private userRepository: Repository<User> = null;
  private profileRepository: ProfileRepository;
  constructor(
  ) {
    this.userRepository = dataSource.getRepository(User);
    this.profileRepository = new ProfileRepository();
  }

  async query(q): Promise<User[]> {
    try {
      const query = this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.customer', 'customer')
      .innerJoinAndSelect('user.profile', 'profile');

      const allUserData = await query.getMany();
      return allUserData;
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id): Promise<User> {
    try {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user && user.id) {
          delete user.password;
        }
        return user;
    } catch (error) {
        throw error.message;
    }
  }

  async findByIdWithPassword(id): Promise<User> {
    try {
        return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
        throw error.message;
    }
  }

  async findByEmail(email): Promise<User> {
    try {
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (user && user.id) {
          delete user.password;
        }
        return user;
    } catch (error) {
        throw error.message;
    }
  }

  async findByEmailWithPassword(email): Promise<User> {
    try {
        return await this.userRepository.findOne({ where: { email: email } });
    } catch (error) {
        throw error.message;
    }
  }

  async create(data): Promise<User> {
    try {
      const user = await this.userRepository.save(data);
      const profileData = {...data, user: user};
      await this.profileRepository.create(profileData);
      return user;
    } catch (error) {
      throw error.message;
    }
  }
}
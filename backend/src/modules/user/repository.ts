import { EntityRepository, Repository, getRepository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import AppError from '../../utils/appError';
import { User } from '../../entities/user';

@EntityRepository(User)
export class UserRepository{
  private userRepository: Repository<User> = null;
  constructor(
  ) {
    this.userRepository = dataSource.getRepository(User);
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

}
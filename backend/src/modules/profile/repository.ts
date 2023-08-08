import { EntityRepository, Repository, getRepository } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import AppError from '../../utils/appError';
import { Profile } from '../../entities/profile';

@EntityRepository(Profile)
export class ProfileRepository{
  private profileRepository: Repository<Profile> = null;
  constructor(
  ) {
    this.profileRepository = dataSource.getRepository(Profile);
  }

  async query(q): Promise<Profile[]> {
    try {
      return await this.profileRepository.find(q);
    } catch (error) {
      throw error.message;
    }
  }

  async findById(id: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({ where: { id } });
    } catch (error) {
      throw error.message;
    }
  }

  async findByUserId(userId: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({ where: { user: { id: userId }} });
    } catch (error) {
      throw error.message;
    }
  }

  async create(profile: Profile): Promise<Profile> {
    try {
      return await this.profileRepository.save(profile);
    } catch (error) {
      throw error.message;
    }
  }

async update(id: string, data: Profile): Promise<any> {
  try {
    let profile = await this.findById(id);

    
    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    profile.lastName = data.lastName;
    profile.firstName = data.firstName;
    profile.phoneNumber = data.phoneNumber;
    profile.CCID = data.CCID;
    profile.language = data.language;
    profile.address = data.address;
    profile.avatar = data.avatar;

    return await this.profileRepository.save(profile);
  } catch (error) {
    throw error.message;
  }
}

}
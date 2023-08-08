import { EntityRepository, Repository, Not, IsNull } from 'typeorm';
import { dataSource } from '../../utils/dataSource';
import { Customer } from '../../entities/customer';
import { UserRepository } from '../user/repository';

@EntityRepository(Customer)
export class CustomerRepository {
  private customerRepository: Repository<Customer> = null;
  private userRepository: UserRepository;
  constructor(
  ) {
    this.customerRepository = dataSource.getRepository(Customer);
    this.userRepository = new UserRepository();
  }

  async query(q): Promise<Customer[]> {
    try {
        return await this.customerRepository.find(q);
    } catch (error) {
        throw error.message;
    }
  }

  async findById(id): Promise<Customer> {
    try {
        return await this.customerRepository.findOne({ where: { id } });
    } catch (error) {
        throw error.message;
    }
  }

  async getByUserId(userId): Promise<Customer> {
    try {
      return await this.customerRepository.findOne({ 
        where: { user: { id: userId } }
      });
    } catch (error) {
        throw error.message;
    }
  }

  async create(data): Promise<Customer> {
    try {
      const user = await this.userRepository.create(data);
      let customer = {...data, user: user};
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw error.message;
    }
  }
}
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entitites/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getById(id: number) {
    const user = this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);
    console.log('userData', userData);
    console.log('newUser', newUser);

    //await this.usersRepository.save(newUser);
    return this.usersRepository.save(newUser);
  }
}

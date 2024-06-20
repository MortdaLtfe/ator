import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateThirdPartUserDto } from './dto/create-third-pat-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateThirdPartUserDto } from './dto/update-google-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * @param createUserDto
   * @returns {User}
   * @description method for creating Non third part User.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(13);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.usersRepository.save(createUserDto);
  }
  /**
   * @param query - Filtering
   * @returns {User[]}
   * @description method to Get the Whole Users in the repo, with option query to filter
   */
  find(query = {}): Promise<User[]> {
    return this.usersRepository.find(query);
  }
  /**
   * @param query - Filtering
   * @returns {User}
   * @description method to get First user have these Properties in the query in users repo
   */
  findOne(query): Promise<User> {
    return this.usersRepository.findOne(query);
  }
  /**
   * @param createThidrdPartUserDto
   * @returns {User}
   * @description method for creating Thrid-Part User using Google
   */
  createGoogle(createThidrdPartUserDto: CreateThirdPartUserDto): Promise<User> {
    return this.usersRepository.save(createThidrdPartUserDto);
  }
  /**
   * @param id - User ID
   * @param updateUserDto
   * @description method for updating a single user depends on the id
   */
  async update(
    id: number,
    updateUserDto: UpdateUserDto | UpdateThirdPartUserDto,
  ): Promise<User> {
    if (!(await this.findOne({ where: { id } }))) throw new NotFoundException();
    return this.usersRepository.save({ id, ...updateUserDto });
  }
  /**
   * @param id - User ID
   * @description method for deleting a single user depends on the id
   */
  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'IsNotUsedEmail', async: true })
@Injectable()
export class IsNotUsedEmail implements ValidatorConstraintInterface {
  constructor(
    //@InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}
  async validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user) return false;
    return true;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Email is Already Used';
  }
}

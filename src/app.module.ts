import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { EmailToken } from './modules/auth/entities/email-token.entity';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      type: 'mysql',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: +process.env.DATABASE_PORT,
      synchronize: true,
      entities: [User, EmailToken],
    }),
    UsersModule,
    AuthModule,
    MailerModule,
  ],
})
export class AppModule {}

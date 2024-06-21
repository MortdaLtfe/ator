import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PasswordToken {
  @PrimaryColumn({ type: 'int' })
  userId: string | number;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'bigint' })
  expiresIn: number;
}

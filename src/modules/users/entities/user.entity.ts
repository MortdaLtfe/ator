import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  photoURL?: string;

  @Column({ type: 'bool', default: false })
  verified: boolean;
  @Column({ type: 'bool', default: false })
  twoFactorAuth: boolean;
}

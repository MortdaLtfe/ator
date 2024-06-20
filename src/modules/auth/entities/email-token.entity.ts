import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EmailToken {
  @PrimaryColumn({ type: 'int' })
  userId: number;
  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'bigint' })
  createdAt: number;
  @Column({ type: 'bigint' })
  expiresAt: number;
}

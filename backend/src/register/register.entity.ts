import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('register')
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;
}

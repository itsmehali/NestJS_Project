import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}

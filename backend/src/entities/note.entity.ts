import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Category, (category) => category.notes, { nullable: true })
  category: Category | null;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @Column({ default: false })
  isArchived: boolean;
}

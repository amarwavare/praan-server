import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
@Entity()
export class File {
  @PrimaryGeneratedColumn('increment')
  fileId: number;

  @CreateDateColumn({ nullable: true, unique: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, unique: false })
  updatedAt: Date;

  @Column({nullable: false})
  file: string;

  @Column({nullable: false})
  fileName: string;

  @Column({nullable: false, default: false})
  isValidated: boolean;

  @Column({nullable: true})
  fileDataJSON: string;
}
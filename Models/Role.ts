import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    name!: string;
}
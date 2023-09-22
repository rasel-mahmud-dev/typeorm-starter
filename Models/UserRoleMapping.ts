import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'; // Assuming you have a User entity defined
import { Role } from './Role'; // Assuming you have a Role entity defined

@Entity('user_role_mapping')
export class UserRoleMapping {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    roleId!: number;

    @Column()
    userId!: number;


    @ManyToOne(() => User, user => user.userRoleMappings)
    @JoinColumn()
    user!: User;

    // @ManyToOne(() => Role, role => role.userRoleMappings)
    // @JoinColumn({ name: 'role_id' })
    // role!: Role;

    @ManyToOne(() => Role)
    // @JoinColumn({ name: 'role_id' })
    role!: Role;
}

import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany} from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    name!: string;

    // @ManyToMany(() => User, user => user.roles)
    // @JoinTable({
    //     name: 'user_role_mapping',
    //     joinColumn: {
    //         name: 'roleId',
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'userId',
    //         referencedColumnName: 'id'
    //     }
    // })
    // users: User[] | undefined;
}

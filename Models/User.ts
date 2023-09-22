import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationOptions
} from "typeorm"
import {Like} from "./Like";
import {Comment} from "./Comment";
import {UserRoleMapping} from "./UserRoleMapping";
import {Role} from "./Role";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true, type: "varchar", nullable: false})
    email!: string

    @Column({type: "varchar", nullable: false})
    firstName!: string

    @Column({type: "varchar", nullable: false})
    lastName!: string

    @OneToMany(() => Like, like => like.tweet)
    likes: Like[] | undefined

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[] | undefined

    @OneToMany(() => UserRoleMapping, roleMapping => roleMapping.user)
    userRoleMappings: UserRoleMapping[] | undefined

    // @ManyToMany(() => Role, role => role.users)
    // @JoinTable({
    //     name: 'user_role_mapping',
    //     joinColumn: {
    //         name: 'userId',
    //         referencedColumnName: 'id'
    //     },
    //     inverseJoinColumn: {
    //         name: 'roleId',
    //         referencedColumnName: 'id'
    //     }
    // })
    // roles: Role[] | undefined;


}
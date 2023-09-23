import {
    Column,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany, ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationOptions
} from "typeorm"
import {Like} from "./Like";
import {Comment} from "./Comment";
import {UserRoleMapping} from "./UserRoleMapping";
import {Role} from "./Role";
import {Product} from "./Product";
import {Tweet} from "./Tweet";

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

    // @OneToMany(()=>Tweet, (tweet)=>tweet)
    // @JoinColumn() // This specifies the foreign key column name in the database
    // tweets: Tweet[] | undefined


    @OneToMany(() => Tweet, (tweet) => tweet.author)
    tweets: Tweet[] | undefined

    @OneToMany(()=>Product, (product)=>product.author)
    products: Product[] | undefined

}
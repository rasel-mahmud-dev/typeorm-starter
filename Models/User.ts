import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, RelationOptions} from "typeorm"
import {Like} from "./Like";
import {Comment} from "./Comment";

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


}
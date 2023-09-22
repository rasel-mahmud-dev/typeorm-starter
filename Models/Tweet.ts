import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./User";

@Entity("tweets")
export class Tweet {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", nullable: false})
    title!: string

    @Column({type: "varchar", nullable: false})
    content!: string

    @Column({type: "varchar", nullable: false})
    cover!: string

    @Column({ type: 'int', nullable: false }) // Assuming authorId is an integer
    authorId!: number;

    @ManyToOne(() => User) // Many-to-One relationship with User
    author!: User;
}

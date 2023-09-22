import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Tweet} from "./Tweet";

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', nullable: false })
    userId!: number;

    @Column({ type: 'int', nullable: false })
    tweetId!: number;

    @ManyToOne(() => User, user => user.likes)
    @JoinColumn({ name: 'userId' }) // This specifies the foreign key column name in the database
    user!: User;

    @ManyToOne(() => Tweet, tweet => tweet.likes)
    @JoinColumn({ name: 'tweetId' }) // This specifies the foreign key column name in the database
    tweet!: Tweet;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
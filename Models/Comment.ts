import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'; // Assuming you have a User entity defined
import { Tweet } from './Tweet'; // Assuming you have a Tweet entity defined

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text', nullable: false })
    content!: string;

    @Column({ type: 'int', nullable: false })
    authorId!: number; // Assuming authorId is an integer

    @Column({ type: 'int', nullable: false })
    tweetId!: number; // Assuming authorId is an integer

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'authorId' })
    author: User | undefined;

    @ManyToOne(() => Tweet, tweet => tweet.comments)
    @JoinColumn({ name: 'tweetId' })
    tweet: Tweet | undefined;
}


# Many-to-one / one-to-many relations
User can have multiple Tweet, 
But each Tweet is owned by only one single user.

```ts
// Tweet Model
@Entity("tweets")
export class Tweet {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", nullable: false})
    title!: string

    @Column({type: "varchar", nullable: false})
    content!: string
    
    @Column({type: 'int', nullable: false}) // Assuming authorId is an integer
    authorId!: number;

    @ManyToOne(() => User, user => user.tweets) // Many-to-One relationship with User
    author!: User;
}
```

```ts
// User
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true, type: "varchar", nullable: false})
    email!: string

    @Column({type: "varchar", nullable: false})
    firstName!: string

    @OneToMany(() => Tweet, (tweet) => tweet.author)
    tweets: Tweet[] | undefined
}
```

```sql
create table public.tweets
(
    id         serial
        constraint "PK_19d841599ad812c558807aec76c"
            primary key,
    title      varchar not null,
    content    varchar not null,
    cover      varchar not null,
    "authorId" integer not null
        constraint "FK_2da2b52386c1c0ad64bf191aa47"
            references public.users
);

create table public.users
(
    id          serial
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    email       varchar not null unique
    "firstName" varchar not null,
    "lastName"  varchar not null
);
```

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



# Many-to-one / one-to-many relations
A User Can have multiple products, and A product can have One Owner/User

```ts
// Product Entity
@Entity("products")
export class Product {
    @PrimaryGeneratedColumn({type: "int"})
    id!: number

    @Column({type: "varchar", nullable: false})
    title!: string

    @Column({type: "varchar", nullable: false})
    slug!: string

    @Column({type: "double precision", nullable: false})
    price!: number

    @Column({type: "int", nullable: false})
    authorId!: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.products)
    author!: User
}
```


```ts
// User Entity
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

    @OneToMany(()=>Product, (product)=>product.author)
    products: Product[] | undefined
}
```

# Database schema
```sql
create table public.products
(
    id          serial
        constraint "PK_0806c755e0aca124e67c0cf6d7d"
            primary key,
    title       varchar                 not null,
    slug        varchar                 not null,
    price       double precision        not null,
    "authorId"  integer                 not null
        constraint "FK_76ec85a3cf5734a18f3fecda246"
            references public.users,
    "createdAt" timestamp default now() not null
);

create table public.users
(
    id          serial
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    email       varchar not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    "firstName" varchar not null,
    "lastName"  varchar not null
)
```
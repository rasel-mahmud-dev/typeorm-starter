import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";


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


    // @ManyToOne(() => User, (user) => user.products)
    // author!: User
}
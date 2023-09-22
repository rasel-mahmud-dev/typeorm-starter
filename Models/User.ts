import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, RelationOptions} from "typeorm"

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

}
import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";


@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", nullable: false})
    name!: string

    @Column({type: "varchar", nullable: false})
    slug!: string


    @Column({type: "int", nullable: true, default: null})
    parentId?: number | null

    @ManyToOne(() => Category, category => category.id, {nullable: true})
    @JoinColumn({name: "parentId"})
    parent?: Category | null;

    @OneToMany(() => Category, category => category.parent)
    children?: Category[];
}
## Self-referential many-to-one relationship.
The relationship you've defined in your Category entity is a self-referential many-to-one relationship.

In this context:

Many-to-One: This means that many Category entities can be associated with a single parent Category. In other words, multiple categories can have the same parent category.

Self-Referential: This means that a Category can be related to another Category of the same type. It allows a category to have a parent category, and that parent category is also a Category entity.

In your entity definition, you've set up a relationship where each category can have a single parent category (via the parent property), and each parent category can have multiple child categories associated with it.

```ts
// Category Model
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
```

## Get All 
```ts
const categories = await CategoryRepository.findOne({
    relations: {
        children: {
            children: {
                children: {
                    children: {
                        children: true
                    }
                }
            }
        }
    },
    where: {
        id: 6
    }
});


// get from children
const childToParent = await CategoryRepository.findOne({
    relations: {
        parent: {
            parent: {
                parent: {
                    parent: {
                        parent: true
                    }
                }
            }
        }
    },
    where: {
        id: 14 // Earphone
    }
});
```
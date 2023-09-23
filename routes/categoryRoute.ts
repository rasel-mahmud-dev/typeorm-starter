import express, {Request, Response} from "express";
import AppDataSource from "../database/db";
import {Category} from "../Models/Category";

export const CategoryRepository = AppDataSource.getRepository(Category)

const router = express.Router()

router.get("/categories", async (req: Request, res: Response) => {
    const data = await CategoryRepository.find({})
    res.send(data)
})

router.get("/categories/nested", async (req: Request, res: Response) => {
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
    res.send(categories)
})

router.get("/categories/parent", async (req: Request, res: Response) => {
    const categories = await CategoryRepository.findOne({
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
    res.send(categories)
})


router.post("/categories", async (req: Request, res: Response) => {
    const {name, slug, parentId} = req.body
    const newCateogry = new Category()
    newCateogry.name = name
    newCateogry.slug = name
    newCateogry.parentId = parentId ?? null
    const data = await CategoryRepository.save(newCateogry)
    res.send(data)
})


export default router
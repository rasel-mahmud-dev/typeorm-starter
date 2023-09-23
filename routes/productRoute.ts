import express, {Request, Response} from "express";
import AppDataSource from "../database/db";

import {Like} from "../Models/Like";
import {Comment} from "../Models/Comment";
import {Tweet} from "../Models/Tweet";
import {Product} from "../Models/Product";
import {UserRepository} from "./userRouter";

export const Manager = AppDataSource.manager
export const ProductRepository = AppDataSource.getRepository(Product)
export const TweetRepository = AppDataSource.getRepository(Tweet)
export const LikeRepository = AppDataSource.getRepository(Like)
export const CommentRepository = AppDataSource.getRepository(Comment)

const router = express.Router()

router.get("/products", async (req: Request, res: Response) => {
    const data = await ProductRepository.find({
        relations: {
            author: true,
        }
    })
    res.send(data)
})

router.get("/products/users/:userId", async (req: Request, res: Response) => {
    const data = await UserRepository.find({
        relations: {
            products: true,
        },
        where: {
            id: Number(req.params.userId)
        }
    })
    res.send(data)
})

router.get("/products/:productId", async (req: Request, res: Response) => {
    const data = await ProductRepository.findOne({
        relations: {
            author: true
        },
        where: {
            id: Number(req.params.productId)
        }
    })
    res.send(data)
})

router.post("/products", async (req: Request, res: Response) => {
    const {title, price, authorId} = req.body
    const newProduct = new Product()
    newProduct.title = title
    newProduct.slug = title
    newProduct.price = price
    newProduct.authorId = authorId
    const data = await ProductRepository.save(newProduct)
    res.send(data)
})


export default router
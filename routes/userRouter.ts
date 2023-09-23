import express, {Request, Response} from "express";

import {User} from "../Models/User";
import AppDataSource from "../database/db";
export const UserRepository = AppDataSource.getRepository(User)

const router = express.Router()

router.get("/users", async (req: Request, res: Response) => {
    const users = await UserRepository.find({where: {}})
    res.send(users)
})

router.get("/users/:userId/tweets", async (req: Request, res: Response) => {
    const users = await UserRepository.findOne({
        relations: {
            tweets: true
        },
        where: {
            id: Number(req.params.userId)
        }
    })
    res.send(users)
})

router.get("/users/roles/:userId", async (req: Request, res: Response) => {
    const userRoles = await UserRepository.find({
        relations: {
            userRoleMappings: {
                role: true
            }
        },
        where: {
            id: Number(req.params.userId)
        }
    })
    res.send(userRoles)
})

router.post("/users", async (req: Request, res: Response) => {
    const {firstName, lastName, email} = req.body;
    let newUser = new User()
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.email = email
    const result = await UserRepository.save(newUser)
    res.send(result)
})


export default router
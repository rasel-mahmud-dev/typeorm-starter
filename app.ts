import express, {Response, Request, NextFunction} from "express"
import "reflect-metadata";
import {User} from "./Models/User";
import AppDataSource from "./database/db";
import {Tweet} from "./Models/Tweet";
import {Like} from "./Models/Like";
import {Comment} from "./Models/Comment";

export const Manager = AppDataSource.manager
export const UserRepository = AppDataSource.getRepository(User)
export const TweetRepository = AppDataSource.getRepository(Tweet)
export const LikeRepository = AppDataSource.getRepository(Like)
export const CommentRepository = AppDataSource.getRepository(Comment)


const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    console.log("skdfj")
    res.send("hisdf")
})

app.get("/users", async (req: Request, res: Response) => {
    const users = await UserRepository.find({where: {}})
    res.send(users)
})


app.get("/users/roles/:userId", async (req: Request, res: Response) => {
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


app.post("/users", async (req: Request, res: Response) => {
    const {firstName, lastName, email} = req.body;
    let newUser = new User()
    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.email = email
    const result = await UserRepository.save(newUser)
    res.send(result)
})

app.get("/tweets", async (req: Request, res: Response) => {
    const data = await TweetRepository.find({
        relations: {
            author: true,
        }
    })
    res.send(data)
})

app.get("/tweets/:tweetId", async (req: Request, res: Response) => {
    const data = await TweetRepository.findOne({
        relations: {
            author: true,
            likes: {
                user: true
            },
            comments: {
                author: true
            }
        },
        where: {
            id: Number(req.params.tweetId)
        },
        select: {
            likes: {
                id: true,
                createdAt: true,
                user: {
                    firstName: true
                }
            },
            comments: {
                content: true,
                author: {
                    firstName: true
                }
            }
        }
    })
    res.send(data)
})

app.post("/tweets/like", async (req: Request, res: Response) => {
    const {tweetId, userId} = req.body;

    let newLike = new Like()
    newLike.tweetId = tweetId
    newLike.userId = userId

    const result = await LikeRepository.save(newLike)
    res.send(result)
})

app.post("/tweets/comment", async (req: Request, res: Response) => {
    const {tweetId, authorId, content} = req.body;

    let newComment = new Comment()
    newComment.tweetId = tweetId
    newComment.content = content
    newComment.authorId = authorId

    const result = await CommentRepository.save(newComment)
    res.send(result)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.send(err.message)
})


app.listen(2200, () => console.log("server is running on port 2200"))


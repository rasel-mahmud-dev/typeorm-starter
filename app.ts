import express, {Response, Request} from "express"
import "reflect-metadata";
import {User} from "./Models/User";
import AppDataSource from "./database/db";
import {Tweet} from "./Models/Tweet";

export const Manager = AppDataSource.manager
export const UserRepository = AppDataSource.getRepository(User)
export const TweetRepository = AppDataSource.getRepository(Tweet)


const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    console.log("skdfj")
    res.send("hisdf")
})

app.get("/users", async (req: Request, res: Response) => {
    const users = await UserRepository.find( {where: {}})
    res.send(users)
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
    const data = await TweetRepository.find( {
        relations: {
            author: true,
        }
    })
    res.send(data)
})

app.post("/tweets", async (req: Request, res: Response) => {
    const {title, content, cover, authorId} = req.body;
    let newTweet = new Tweet()
    newTweet.authorId = authorId
    newTweet.content = content
    newTweet.cover = cover
    newTweet.title = title
    const result = await TweetRepository.save(newTweet)
    res.send(result)
})


app.listen(2200, () => console.log("server is running on port 2200"))


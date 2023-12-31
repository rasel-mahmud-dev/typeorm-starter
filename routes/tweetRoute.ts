import express, {Request, Response} from "express";
import AppDataSource from "../database/db";

import {Like} from "../Models/Like";
import {Comment} from "../Models/Comment";
import {Tweet} from "../Models/Tweet";

export const Manager = AppDataSource.manager
export const TweetRepository = AppDataSource.getRepository(Tweet)
export const LikeRepository = AppDataSource.getRepository(Like)
export const CommentRepository = AppDataSource.getRepository(Comment)

const router = express.Router()

router.get("/tweets", async (req: Request, res: Response) => {
    const data = await TweetRepository.find({
        relations: {
            author: true,
        }
    })
    res.send(data)
})

router.get("/tweets/:tweetId", async (req: Request, res: Response) => {
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

router.post("/tweets/like", async (req: Request, res: Response) => {
    const {tweetId, userId} = req.body;

    let newLike = new Like()
    newLike.tweetId = tweetId
    newLike.userId = userId

    const result = await LikeRepository.save(newLike)
    res.send(result)
})

router.post("/tweets/comment", async (req: Request, res: Response) => {
    const {tweetId, authorId, content} = req.body;

    let newComment = new Comment()
    newComment.tweetId = tweetId
    newComment.content = content
    newComment.authorId = authorId

    const result = await CommentRepository.save(newComment)
    res.send(result)
})

router.get("/tweets/detail/:id", async (req: Request, res: Response) => {
    const tweets = await AppDataSource.getRepository(Tweet)
        .createQueryBuilder("tweet") // first argument is an alias. Alias is what you are selecting - tweet. You must specify it.
        .innerJoinAndSelect("tweet.author", "author")
        .leftJoinAndSelect("tweet.comments", "comment")
        // .where("tweet.isPublished = true")
        .andWhere("(tweet.id = :tweetId OR tweet.title = :tweeTitle)")
        .orderBy("tweet.id", "DESC")
        .skip(0)
        .take(10)
        .setParameters({ tweetId: 9, tweeTitle: "Rust New Things" })
        .getMany()


    res.send(tweets)
})



export default router
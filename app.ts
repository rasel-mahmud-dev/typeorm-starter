import express, {Response, Request, NextFunction} from "express"
import "reflect-metadata";
import tweetRoute from "./routes/tweetRoute";
import userRouter from "./routes/userRouter";

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    console.log("skdfj")
    res.send("hisdf")
})

app.use(tweetRoute)
app.use(userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.send(err.message)
})


app.listen(2200, () => console.log("server is running on port 2200"))


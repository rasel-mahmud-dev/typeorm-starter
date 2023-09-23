import express, {Response, Request, NextFunction} from "express"
import "reflect-metadata";
import tweetRoute from "./routes/tweetRoute";
import userRouter from "./routes/userRouter";
import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRoute";
const { exec } = require('child_process');

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    console.log("skdfj")
    res.send("hisdf")
})

app.use(tweetRoute)
app.use(userRouter)
app.use(productRoute)
app.use(categoryRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.send(err.message)
})

function backupDatabase(){
    const dbName = 'type_orm';
    const userName = 'postgres';
    const password = 'rasel';
    const host = 'localhost'; // Default is 'localhost'
    const port = 5432; // Default is 5432

    // psql -U postgres -c "SELECT 4 + 10 as result";
    // pg_dump -U postgres -d type_orm -h localhost -p 5432 -f filename.sql

    const backupCommand = `pg_dump -U postgres -d type_orm -h localhost -p 5432 -f filename.sql`;
    // @ts-ignore
    exec(backupCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
        } else {
            console.log('Backup completed successfully');
        }
    });
}
backupDatabase()

app.listen(2200, () => console.log("server is running on port 2200"))


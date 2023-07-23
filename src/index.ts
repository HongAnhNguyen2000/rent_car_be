import express, { Express, Request, Response } from "express";
import database from "./database";
import helmet from "helmet";
import AppError from "../utils/appError";
import authRouter from "../routes/authRouter"

const port = 8000;

const app: Express = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.use(express.static(`${__dirname}/public`));


async function getUsers() {
  const [result] = await database.query("Select * from users");
  return result
}

const users = getUsers().then((result)=> console.log('result', result));

app.get("/", (req: Request, res: Response) => {
  res.send("HELLO FROM EXPRESS + TS!!!!");
});

// 3) ROUTES
app.use("/api/v1/users", authRouter);


app.all("*", (req: Request, res: Response, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


const server = app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...", err);
    server.close(() => {
        process.exit(1);
    })
})
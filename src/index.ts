import express, { Express, Request, Response } from "express";
import database from "./database";
import helmet from "helmet";
import AppError from "../utils/appError";
import session from "express-session";
import passport from "./oauth";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const authRouter = require('../routes/authRouter'); 

const port = 8000;

const app: Express = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({
  methods: ["POST", "GET", "PUT"],
  credentials: true
}))

app.use(express.static(`${__dirname}/public`));
app.use(
    session({
        secret: "My secret",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
)
app.use(passport.initialize())

// 3) ROUTES
app.use("/api/v1/auth", authRouter);



async function getUsers() {
  const [result] = await database.query("Select * from users");
  return result
}

const users = getUsers().then((result)=> console.log('result', result));

app.get("/", (req: Request, res: Response) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});
app.use (
  session ({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
  })
);

app.use (passport.initialize ());
app.use (passport.session ());
app.get (
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

app.get (
  '/auth/google/callback',
  passport.authenticate ('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get ('/auth/google/failure', (req, res) => {
  res.send ('Something went wrong!');
});

app.get ('/auth/protected', (req, res) => {
    let name = req.user
    console.log('name', name)
  res.send (`Hello ${name}`);
});

app.use ('/auth/logout', (req, res) => {
  res.send ('See you again!');
});

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
import { createConnection } from "typeorm";
import express, { Express } from "express";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import AppError from "./utils/appError";

const carRouter = require('./modules/car/car.route'); 

const port = 8000;
const config = require('../db.config');
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
// app.use(passport.initialize())

app.use("/api/v1/car/", carRouter);
app.listen(port, async () => {
  console.log(config);
  await createConnection(config)
  .catch(err => {
      console.log("error create connect", err)
  })
  console.log(`Listening on port ${port}`);
});

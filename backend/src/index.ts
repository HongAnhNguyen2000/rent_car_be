import express, { Express } from "express";
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import AppError from "./utils/appError";
import { sequelize } from "./models";

const port = process.env.PORT || 50000;
const app: Express = express();
const db = require('./models');

const carRouter = require('./modules/car/car.route'); 

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

app.listen({ port }, async () => {
  await db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  console.log(`Server up on http://localhost:${port}`)
});

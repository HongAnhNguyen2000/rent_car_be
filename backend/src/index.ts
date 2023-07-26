import express, { Express } from "express";
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import AppError from "./utils/appError";

// const Sequelize = require('sequelize');
// const config = require('./config');
const carRouter = require('./modules/car/car.route'); 

const port = 8000;
const dbConfig = require('../db.config');
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

// const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
//   host: dbConfig.development.host,
//   dialect: dbConfig.development.dialect
// });

// module.exports = sequelize;

app.use("/api/v1/car/", carRouter);
app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  console.log(dbConfig);
});

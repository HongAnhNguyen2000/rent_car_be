import { createConnection } from 'typeorm';
import express, { Express, Request, Response } from "express";
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { carController } from './modules/car/controller';
import { showroomController } from './modules/showroom/controller';
import { userController } from './modules/user/controller';
import passport from "./modules/user/passport";

import { brandAgencyController } from './modules/brand/controller';
import { dataSource } from './utils/dataSource';
import AppError from './utils/appError';


const port = process.env.PORT || 5001;
const app: Express = express();

async function main() {

  console.log(config);
  await createConnection(config)

  await dataSource.initialize()

    .then(async conn => {
      await conn.runMigrations();
      console.log("create connect success")
    })
    .catch(err => {
      console.log("error create connect", err)
    });

  app.use(helmet());
  app.use(express.json({ limit: "10kb" }));
  app.use(cookieParser());
  app.use(cors({
    methods: ["POST", "GET", "PUT"],
    credentials: true
  }))

  app.use(express.json());
  app.use(express.static(`${__dirname}/public`));
  app.use(
      session({
          secret: "My secret",
          resave: false,
          saveUninitialized: true,
          cookie: {secure: false}
      })
  );
  app.use (passport.initialize());
  app.use (passport.session());


  app.use("/api/v1/car/", carController);
  app.use("/api/v1/showroom/", showroomController);
  app.use("/api/v1/user", userController)
  app.use("/api/v1/brand", brandAgencyController);

  app.all("*", (req: Request, res: Response, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.listen({ port }, async () => {
    console.log(`Server up on http://localhost:${port}`);
  });
}

main();
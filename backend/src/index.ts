import express, { Express, Request, Response } from "express";
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import passport from "./modules/user/passport";
import AppError from './utils/appError';
import { userController } from './modules/user/controller';
import { carController } from './modules/car/controller';
import { showroomController } from './modules/showroom/controller';
import { brandAgencyController } from './modules/brand/controller';
import { dataSource } from './utils/dataSource';

import { profileController } from './modules/profile/controller';

import { insurancenController } from './modules/insurance/controller';
import { addonController } from './modules/addon/controller';
import { specificCarController } from "./modules/specificCar/controller";


const multer = require("multer");
const port = process.env.PORT || 5001;
const app: Express = express();

async function main() {
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
    methods: ["POST", "GET", "PUT", "DELETE"],
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

  app.use("/api/v1/user", userController)
  app.use("/api/v1/car", carController);
  app.use("/api/v1/specific-car", specificCarController);
  app.use("/api/v1/showroom", showroomController);
  app.use("/api/v1/brand", brandAgencyController);

  app.use("/api/v1/profile", profileController);

  app.use("/api/v1/addon", addonController);
  app.use("/api/v1/insurance", insurancenController);


  app.all("*", (req: Request, res: Response, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File is too large",
        });
      }
  
      if (error.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          message: "File limit reached",
        });
      }
  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "File must be an image",
        });
      }
    }
  });

  app.listen({ port }, async () => {
    console.log(`Server up on http://localhost:${port}`);
  });
}

main();
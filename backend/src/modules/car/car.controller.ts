import { NextFunction, Request, Response } from "express";

console.log("any23123");

exports.getList = async (req: Request, res: Response, next: NextFunction) => {
    console.log("getList");
}

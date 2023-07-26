import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import database from "../src/database";
import { RowDataPacket } from "mysql2";
import crypto from 'crypto';
import moment from "moment";
import jwt from 'jsonwebtoken';

exports.verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Error: 'You are not logged in'})
    } else {
    jwt.verify(token, "jwt-secret-rent-car-key", (err: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
      if (err) {
        return res.json({ Error: 'Token is not authenticated' });
      } else {
        if (decoded && typeof decoded === 'object' && 'email' in decoded) {
          req.email = decoded.email as string;
        }
        next();
      }
    });
    }
}

exports.register = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.password) {
    return res.status(400).json({ Error: "Password is required" });
  }
    const saltRounds = 10;
    const uuid = crypto.randomBytes(16).toString("hex");
    const momentTime = moment().format('YYYY-MM-DD hh:mm:ss')
    bcrypt.hash(req.body.password.toString(), saltRounds, (err: Error | undefined, hash: string) => {
    if (err) {
      console.error('Error for hashing password:', err);
      return res.status(500).json({ Error: "Error for hashing password" });
    }
    const sqlQuery = "INSERT INTO users (`user_id`, `email`, `password`, `created_at`) VALUES (?, ?, ?, ?)";
    const values = [uuid,req.body.email,hash, momentTime];

    database.query(sqlQuery, values)
      .then(() => {
        return res.status(200).json('register success');
      })
      .catch((dbErr) => {
        console.error('Error executing the query:', dbErr);
        return res.status(400).json({ Error: "Error executing the query" });
      });
  });
};


exports.login = (req: Request, res: Response, next: NextFunction) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  database.query(sql, [req.body.email])
    .then((result) => {
      const userData: RowDataPacket[] = result as RowDataPacket[]; // Type assertion
      if (userData.length > 0) {
        bcrypt.compare(req.body.password.toString(), userData[0].password)
          .then((isPasswordMatch) => {
              if (isPasswordMatch) {
                  const email = userData[0].email;
                  const token = jwt.sign({ email }, "jwt-secret-rent-car-key", { expiresIn: '1d' }) 
                  res.cookie('token', token)
              return res.status(200).json({ message: "Login successful" });
            } else {
              return res.status(400).json({ Error: "Wrong email or wrong password" });
            }
          })
          .catch((err) => {
            return res.status(500).json({ Error: "Error comparing passwords" });
          });
      } else {
        return res.status(400).json({ Error: "No email exists" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ Error: "Error executing the database query" });
    });
};
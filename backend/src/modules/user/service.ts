import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../entities/user';
import { Profile } from "../../entities/profile";
import { dataSource } from '../../utils/dataSource';

// exports.verifyUser = async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({Error: 'You are not logged in'})
//     } else {
//     jwt.verify(token, "jwt-secret-rent-car-key", (err: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
//       if (err) {
//         return res.json({ Error: 'Token is not authenticated' });
//       } else {
//         if (decoded && typeof decoded === 'object' && 'email' in decoded) {
//           req.email = decoded.email as string;
//         }
//         next();
//       }
//     });
//     }
// }


exports.register = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.password) {
    return res.status(400).json({ Error: "Password is required" });
  }
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(req.body.password.toString(), saltRounds);

      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { email: req.body.email },
      });
      if (user) {
          return res.status(400).json({ Error: "User has already exists" });
      }

      const newUser = new User();
        newUser.email = req.body.email;
        newUser.password = hash;
        await userRepository.save(newUser);
        return res.status(200).json('register success');

  } catch (error) {
    console.error('Error executing the query:', error);
    return res.status(400).json({ Error: "Error executing the query" });
  }
};


exports.login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!password) {
        return res.status(400).json({ Error: "Password || Email is required" });
    }
  try {
    const userRepository = dataSource.getRepository(User);
     const user = await userRepository.findOne({
      where: { email },
     });

    if (!user) {
      return res.status(400).json({ Error: "No email exists" });
    }
    const isPasswordMatch = await bcrypt.compare(password.toString(), user.password);

    if (isPasswordMatch) {
      const email = user.email;
      const userId = user.id;
       const profileRepository = dataSource.getRepository(Profile);
       const profileUser = await profileRepository.find({
        where: { user: { id: userId }},
        });
      const token = jwt.sign({ email }, "jwt-secret-rent-car-key", { expiresIn: '30m' });
        res.cookie('token', token);
        const refreshToken = jwt.sign({ email }, "refresh-token-secret", { expiresIn: '7d' });
      return res.status(200).json({ message: "Login successful", token: token, refreshToken: refreshToken,profile: profileUser });
    } else {
      return res.status(400).json({ Error: "Wrong email or wrong password" });
    }
  } catch (error) {
    console.error('Error executing the database query:', error);
    return res.status(500).json({ Error: "Error executing the database query" });
  }
};
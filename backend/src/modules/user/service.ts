import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import Setting from "../../utils/setting";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../entities/user';
import { Profile } from "../../entities/profile";
import { dataSource } from '../../utils/dataSource';
import { UserRepository } from './repository';
import { CustomerRepository } from '../customer/repository';
import { ProfileRepository } from '../profile/repository';
import { StaffRepository } from '../staff/repository';

const validator = require('validator');
const userRepo = new UserRepository();
const profileRepo = new ProfileRepository();
const customerRepo = new CustomerRepository();
const staffRepo = new StaffRepository();
const saltRounds = 10;

// exports.verifyUser = async (req, res, next) => {
//     const token = req.header.authorization;
//     if (!token) {
//         return res.json({Error: 'You are not logged in'})
//     } else {
//       jwt.verify(token, Setting.JWT_KEY, (err: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
//         if (err) {
//           return res.json({ Error: 'Token is not authenticated' });
//         } else {
//           if (decoded && typeof decoded === 'object' && 'email' in decoded) {
//             req.userId = decoded.email as string;
//           }
//           next();
//         }
//     });
//     }
// }

const register = async (req: Request, res: Response, next: NextFunction) => {
  let data = req.body;
  if (!data.password) {
    throw "Password is required";
  }
  if (!validator.isEmail(data.email)) {
    throw "Email is invalid";
  }

  try {
    const hash = await bcrypt.hash(data.password.toString(), saltRounds);
    const exist = await userRepo.findByEmail(data.email);
    if (exist) {
      throw "User has already exists";
    }

    return {...data, password: hash}
    // const customer = await customerRepo.create(data);
    // return await userRepo.findById(customer.user.id);
    // return res.status(200).json({message: "Register success", user});

  } catch (error) {
    throw error;
  }
};


exports.registerCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await register(req, res, next);
    const customer = await customerRepo.create(data);
    const user = await userRepo.findById(customer.user.id);
    return res.status(200).json({message: "Register success", user});
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};


exports.registerStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const data = await register(req, res, next);
    const staff = await staffRepo.create(data);
    const user = await userRepo.findById(staff.user.id);
    return res.status(200).json({message: "Register success", user});
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};


exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!password || !email) {
      return res.status(400).json({ Error: "Password || Email is required" });
  }
  try {
      const user = await userRepo.findByEmailWithPassword(email);
      if (!user) {
          return res.status(400).json({ Error: "User not found" });
      }

      const isPasswordMatch = await bcrypt.compare(password.toString(), user.password);
      if (!isPasswordMatch) {
          return res.status(400).json({ Error: "Wrong email or wrong password" });
      }

      const token = jwt.sign({ id: user.id }, Setting.JWT_KEY, { expiresIn: '30m' });
      const refreshToken = jwt.sign({ email }, Setting.JWT_KEY, { expiresIn: '7d' });
      const profileUser = await profileRepo.findById(user.id);
      // const profileUser = await profileRepo.findByUserId(user.id);
      
      return res.status(200).json({
          token: token,
          refreshToken: refreshToken,
          profile: profileUser,
          user
      });
  
  } catch (error) {
      return res.status(500).json({ Error: error });
      // return res.status(500).json({ Error: "Internal server" });
  }
};

exports.oauthAppLogin = async (req, res, next) => {
  const googleToken = req.query.accessToken;
  const client = new OAuth2Client();

  async function verifyToken() {
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: Setting.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const user = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };
      return user;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return null;
    }
  }

  const verifiedUser = await verifyToken();
  if (verifiedUser) {
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: verifiedUser.email },
    });
    const hash = await bcrypt.hash('oauthuser', saltRounds);
    const token = jwt.sign({ email:verifiedUser.email }, "jwt-secret-rent-car-key", { expiresIn: '30m' });
    const refreshToken = jwt.sign({ email: verifiedUser.email }, "refresh-token-secret", { expiresIn: '7d' });
    if (!user) {
      const newUser = new User();
      newUser.email = verifiedUser.email
      newUser.password = hash
      const userProfile = await userRepository.save(newUser);
      return res.status(200).json({
        message: "Login successful",
        token,
        refreshToken,
        profile: { ...verifiedUser, userId: userProfile?.id}
      });
    } else {
      const userId = user.id;
      const profileRepository = dataSource.getRepository(Profile);
      const profileUser = await profileRepository.find({
        where: { user: { id: userId } },
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        refreshToken,
        profile: profileUser
      });
    }
  } else {
    res.status(401).json({ error: 'Token verification failed' });
  }
};
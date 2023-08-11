import jwt, { JwtPayload } from 'jsonwebtoken';
import Setting from "../utils/setting";
import { UserRepository } from "../modules/user/repository";
import { CustomerRepository } from '../modules/customer/repository';
import { StaffRepository } from '../modules/staff/repository';

const userRepo = new UserRepository();
const customerRepo = new CustomerRepository();
const staffRepo = new StaffRepository ();
const permError = 'Permission denied';
const noCredentialError = 'Authentication credentials were not provided';
const wrongTokenError = 'Token is not authenticated';

const checkAuth = async(req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    throw noCredentialError;
  }
  
  try {
    const decoded = await jwt.verify(token, Setting.JWT_KEY);
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      const id = decoded.id as string;
      const user = await userRepo.findById(id);
      if (!user) {
        throw permError;
      }
      req.user = user;
      return;
    }
  } catch (error) {
    throw wrongTokenError;
  }
}

exports.isAuthenticated = async(req, res, next) => {
  try {
    await checkAuth(req, res, next);
    next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
}

exports.isCustomer = async(req, res, next) => {
  try {
    await checkAuth(req, res, next);
    const customer = await customerRepo.getByUserId(req.user.id);
    if (!customer) {
      throw permError;
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
}

exports.isStaff = async(req, res, next) => {
  try {
    await checkAuth(req, res, next);
    const staff = await staffRepo.getByUserId(req.user.id);
    if (!staff) {
      throw permError;
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
}

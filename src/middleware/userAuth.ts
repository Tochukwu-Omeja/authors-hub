import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

// Middleware function to authenticate user based on JWT token
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  // Retrieve token from cookies
  const token = req.cookies.token;
  console.log(req.cookies);

  try {
    // If token is missing, ask user to log in
    if (!token) return res.send('Please go and login');

    // Verify the token and decode user information
    req.user = Jwt.verify(token, process.env.JWT_SECRET as string);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.send('Could not verify token!');
  }
}

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


declare global {
  namespace Express {
    export interface Request {
      user?: any; 
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    console.log(decoded); // Check if the decoded token has the expected data

    req.user = decoded; // Attach decoded user info to the request object

    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};


import { Request, Response, NextFunction } from "express";
import { prisma } from "../Models/Prisma_Client";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
// import { User } from "../Models/Prisma_Client";  // Make sure to import your User model

export const authMiddleware = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        // console.log(decoded);
        const user:any = await prisma.user.findFirst({
            where:{id: decoded?.id}
        })
        // console.log("From middleware: "+user.name)
        req.user = user;
        next();
      }
    } catch (e) {
      throw new Error("Not authorized, token expired, please login again");
    }
  } else {
    throw new Error("No token attached to request");
  }
});

// const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   const { email } = req.user ;  // Assuming email is present in User model
//   const adminUser = await User.FindOne({ email });
//   if (!adminUser || adminUser.role !== "admin") {
//     throw new Error("You are not an Admin");
//   } else {
//     next();
//   }
// });

// export { authMiddleware, isAdmin };

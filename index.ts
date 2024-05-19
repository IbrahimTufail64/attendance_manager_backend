
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorHandler';
import multer from 'multer';
import path from 'path';

dotenv.config();
import cors from 'cors';
import authRouter from "./routes/authRoutes";
import appRouter from "./routes/appRoutes";
import { authMiddleware } from "./middleware/authMiddleware";
import { prisma } from "./Models/Prisma_Client";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: '*'
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// image upload and serve 
let directory:any = 'public';
if(process.env.BUILD){directory = '../public'}
app.use('/profile', express.static(path.join(__dirname, `${directory}/images`)));
// multer for file upload to disk
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,`${directory}/images`))
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname+'_'+Date.now()+path.extname(file.originalname))
    }
});

const upload =  multer({
    storage
})
app.post("/upload-image",authMiddleware, upload.single('image'),async (req: any, res: Response) => {
  try{
    console.log(req.file); 
    const user = await prisma.user.update({
            where:{
                id: req.user.id
            },
            data:{
                profileUrl: req.file?.filename
            }
        })
    console.log(user);
    res.json(req.file?.filename);
  }
  catch(e:any){
    console.log(e);
    throw new Error(e);
  }
});
// image upload section ended

app.use('/auth',authRouter) 
app.use('/app',appRouter) 

app.get("/", (req: Request, res: Response) => {
  console.log(process.env.JWT_SECRET);
    res.json("Express + TypeScript Server");
});
app.get("/test", (req: Request, res: Response) => {
  console.log("up and running");
    res.json("Express + TypeScript Server");
});
app.use(notFound);
app.use(errorHandler)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

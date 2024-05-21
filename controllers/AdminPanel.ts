import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { generateJWT, refreshJWT } from '../config/jwtToken';  // Make sure to import your jwtToken functions
import { prisma } from "../Models/Prisma_Client";
import moment from "moment";


const getRecords = asyncHandler(async (req: any, res: Response) => {
    try{
        if(!req.user.isAdmin) throw new Error("Not an Admin");
        const users = await prisma.user.findMany({
            where:{
                isAdmin: false
            },
            select:{
                email: true,
                name: true,
                id: true
            }
        });
        res.json(users);
        
    }
    catch(err:any){
        throw new Error(err);
    }
})


const getSingleRecord = asyncHandler(async (req: any, res: Response) => {
    try{
        const id = req.params.id;
        console.log(id);
        console.log('a');
        if(!req.user.isAdmin) throw new Error("Not an Admin");
        const user = await prisma.user.findFirst({
            where:{
                id: Number(id),
            },
            select:{
                email: true,
                name: true,
                id: true
            }
        });
        const attendances = await prisma.atendance.findMany({
            where:{
                userId: Number(id)
            }
        });
        console.log({user,attendances})
        res.json({user,attendances})
    }
    catch(err:any){
        throw new Error(err)
    }
})

const changeStatus = asyncHandler(async (req: any, res: Response) => {
    try{
        if(!req.user.isAdmin) throw new Error("Not an Admin");
        const id = req.params.id;
        let status = req.query.status === 'pending' ? true: false;
        console.log(status);
        const attendance = await prisma.atendance.update({
            where:{
                id: Number(id)
            },
            data:{
                isPending: status
            }
        })
        res.json("Attendance updated");
        
    }
    catch(err:any){
        throw new Error(err);
    }
})

const deleteAttendance = asyncHandler(async (req: any, res: Response) => {
    try{
        if(!req.user.isAdmin) throw new Error("Not an Admin");
        const id = req.params.id;
        let status = req.query.status === 'pending' ? true: false;
        console.log(status);
        const attendance = await prisma.atendance.delete({
            where:{
                id: Number(id)
            }
        })
        res.json("Attendance deleted");
        
    }
    catch(err:any){
        throw new Error(err);
    }
})

const createAttendance = asyncHandler(async (req: any, res: Response) => {
    try{
        if(!req.user.isAdmin) throw new Error("Not an Admin");
        const id = req.params.id;
        let status = req.body.status === 'pending' ? true: false;
        console.log(status);
        const attendance = await prisma.atendance.create({
            data:{
                userId: Number(id),
                marked: req.body.attendance,
                isPending: status,
                createdAt: req.body.date  
            }
        })
        res.json("Attendance deleted");
        
    }
    catch(err:any){
        throw new Error(err);
    }
})

const printSingleRecord = asyncHandler(async (req: any, res: Response) => {
    try{
        const id = req.params.id;
        console.log(id);
        console.log(new Date(req.body.startDate),new Date(req.body.endDate));
        if(!req.user.isAdmin) throw new Error("Not an Admin");
        const user = await prisma.user.findFirst({
            where:{
                id: Number(id),
            },
            select:{
                email: true,
                name: true,
                id: true
            }
        });
        const attendances = await prisma.atendance.findMany({
            where:{
                userId: Number(id),
                createdAt :{
                    gte: new Date(req.body.startDate),
                    lt: new Date(req.body.endDate)
                }
            },
            orderBy:{
                createdAt: 'desc'
            }
        });



const startDate = moment(req.body.startDate);
const endDate = moment(req.body.endDate);

const differenceInDays = endDate.diff(startDate, 'days');
console.log("Difference in days:", differenceInDays);

        console.log({user,attendances})
        res.json({user,attendances, differenceInDays})
    }
    catch(err:any){
        throw new Error(err)
    }
})

export {
    getRecords,
    getSingleRecord,
    changeStatus,
    deleteAttendance,
    createAttendance,
    printSingleRecord
}
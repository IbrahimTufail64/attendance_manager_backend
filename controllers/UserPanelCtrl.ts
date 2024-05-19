import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { generateJWT, refreshJWT } from '../config/jwtToken';  // Make sure to import your jwtToken functions
import { prisma } from "../Models/Prisma_Client";


const markAttendance = asyncHandler(async (req: any, res: Response) => {
    try{
        const { id } = req.user;
        // configuring date
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Set time to the start of the day
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
        
        const attendance_by_date = await prisma.atendance.findMany({
            where: {
                user: req.user,
                createdAt: {
                gte: startDate,
                lt: endDate,
                },
            },
        });
        if(attendance_by_date.length>0) throw new Error("Attendance Already marked");
        const attendance:any = await prisma.atendance.create({
            data:{
                user:{
                    connect:{
                        id
                    }
                },
                marked: 'present',
                isPending: false
            }
        });
        res.status(200).json({
            message:"Attendance Marked",
            attendance
        });
    }
    catch(err:any){
        throw new Error(err);
    }
})

const markLeave = asyncHandler(async (req: any, res: Response) => {
    try{
        const { id } = req.user;
        // configuring date
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Set time to the start of the day
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // Set time to the end of the day
        
        const attendance_by_date = await prisma.atendance.findMany({
            where: {
                user: req.user,
                createdAt: {
                gte: startDate,
                lt: endDate,
                },
            },
        });
        if(attendance_by_date.length>0) throw new Error("Attendance Already exists");
        const attendance:any = await prisma.atendance.create({
            data:{
                userId: id,
                marked: 'leave',
            }
        });
        res.status(200).json({
            message:"Attendance Marked",
            attendance
        });
    }
    catch(err:any){
        throw new Error(err);
    }
})

const fetch_attendance = asyncHandler(async (req: any, res: Response) => {
    try{
        const attendance = await prisma.atendance.findMany({
            where: {
                user: req.user,
            },
        });
        res.json(attendance)
    }
    catch(err:any){
        throw new Error(err);
    }
})

const edit_photo = asyncHandler(async (req: any, res: Response) => {
    try{
        
        res.json("Profile Picture Updated");
    }
    catch(err:any){
        throw new Error(err);
    }
})

export {
    markAttendance,
    markLeave,
    fetch_attendance,
    edit_photo
}
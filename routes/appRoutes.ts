import express from 'express';

import {authMiddleware} from  '../middleware/authMiddleware';
import { edit_photo, fetch_attendance, markAttendance, markLeave } from '../controllers/UserPanelCtrl';
import {  changeStatus, createAttendance, deleteAttendance, getRecords, getSingleRecord } from '../controllers/AdminPanel';
let appRouter = express.Router();

appRouter.get('/mark_attendance',authMiddleware, markAttendance);
appRouter.get('/mark_leave',authMiddleware, markLeave);
appRouter.get('/fetch_attendance',authMiddleware, fetch_attendance);
appRouter.post('/update_pfp',authMiddleware, edit_photo);

// admin routes
appRouter.get('/admin/get_records',authMiddleware, getRecords);
appRouter.get('/admin/get_record/:id',authMiddleware, getSingleRecord);
appRouter.get('/admin/change_status/:id',authMiddleware, changeStatus);
appRouter.delete('/admin/delete_attendance/:id',authMiddleware, deleteAttendance);
appRouter.post('/admin/create_attendance/:id',authMiddleware, createAttendance);


export default appRouter;
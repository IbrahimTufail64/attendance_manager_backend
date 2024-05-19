import express from 'express';
import { 
    createUser, 
    loginUserCtrl,
     deleteUser,
    //  updateUser,
    //  handleRefreshToken,
     logoutUser,
    //   updatePassword, resetPassword 
    }
     from '../controllers/userCtrl';
import {authMiddleware} from  '../middleware/authMiddleware';
let authRouter = express.Router();

authRouter.post('/register', createUser);
authRouter.post('/login', loginUserCtrl);
authRouter.get('/logout',authMiddleware, logoutUser);
authRouter.delete('/:id',authMiddleware,deleteUser);

export default authRouter;
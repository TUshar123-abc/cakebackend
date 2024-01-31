import express from 'express';
import { getDataById } from '../controllers/updateController.js';




const router = express.Router() 



// user register \\ method get



router.get('/aja-use', getDataById)


export default router;
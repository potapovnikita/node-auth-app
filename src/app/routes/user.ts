import * as express from 'express';
import { getUserData, getUserList, editUserData } from '../controllers/users';

const router = express.Router();

router.get('/getUser', getUserData);
router.patch('/editUser', editUserData);
router.get('/getUsersList', getUserList);

export default router;

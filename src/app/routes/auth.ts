import * as express from 'express';
import { checkUniqueLigin, checkBlockedUser } from '../middlewares';
import { signup, signin } from '../controllers/auth';

const router = express.Router();

router.post('/signin', checkBlockedUser, signin);
router.post('/signup', checkUniqueLigin, signup);

export default router;

import { Router } from 'express';
import {Request, Response} from 'express';
import swaggerSpec from './utils/swagger';
import usersController from './controllers/users';
import tagController from './controllers/tags';
import userAdminController from './controllers/userAdmin';

const router: Router = Router();

router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

router.get('/', (req: Request, res: Response) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', usersController);

router.use('/admin', userAdminController);

router.use('/tags', tagController);

export default router;

import express from 'express';
import userController from '../controllers/user.controller.js';
import middleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const path = '/v1/user';

router.route('')
  .post(userController.create);

router.route('/:userId')
  .get(middleware.basicAuth, middleware.userAuth, userController.fetchById)
  .put(middleware.basicAuth, middleware.userAuth, userController.updateById);


export {
  router,
  path,
};

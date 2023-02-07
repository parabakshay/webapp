import express from 'express';
import userController from '../controllers/product.controller.js';
import middleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const path = '/v1/product';

router.route('/:productId')
  .get(userController.fetchById)

router.route('')
  .post(middleware.basicAuth, middleware.productAuth, userController.create);

router.route('/:productId')
  .put(middleware.basicAuth, middleware.productAuth, userController.updateById)
  .patch(middleware.basicAuth, middleware.productAuth, userController.updateById)
  .delete(middleware.basicAuth, middleware.productAuth, userController.updateById);


export {
  router,
  path,
};
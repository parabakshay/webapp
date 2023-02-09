import express from 'express';

import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import productValidations from '../validations/product.validation.js';
import productController from '../controllers/product.controller.js';
import middleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const path = '/v1/product';

router.route('/:productId')
  .get(requestValidatorMiddleware(productValidations.fetchById), productController.fetchById)

router.route('')
  .post(requestValidatorMiddleware(productValidations.create), middleware.basicAuth, productController.create);

router.route('/:productId')
  .put(requestValidatorMiddleware(productValidations.updatePutById), middleware.basicAuth, middleware.productAuth, productController.updateById)
  .patch(requestValidatorMiddleware(productValidations.updatePatchById), middleware.basicAuth, middleware.productAuth, productController.updateById)
  .delete(requestValidatorMiddleware(productValidations.deleteById), middleware.basicAuth, middleware.productAuth, productController.deleteById);


export {
  router,
  path,
};
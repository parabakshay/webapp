import express from 'express';
import multer from 'multer';
import {
  v4 as uuidv4
} from 'uuid';

import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import multipartValidator from '../middlewares/multipart.middleware.js';
import productValidations from '../validations/product.validation.js';
import productController from '../controllers/product.controller.js';
import middleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const upload = multer({
  dest: '/tmp/images/',
  filename: uuidv4(),
});
const path = '/v1/product';

router.route('/:productId')
  .get(requestValidatorMiddleware(productValidations.fetchById), productController.fetchById)

router.route('')
  .post(requestValidatorMiddleware(productValidations.create), middleware.basicAuth, productController.create);

router.route('/:productId')
  .put(requestValidatorMiddleware(productValidations.updatePutById), middleware.basicAuth, middleware.productAuth, productController.updateById)
  .patch(requestValidatorMiddleware(productValidations.updatePatchById), middleware.basicAuth, middleware.productAuth, productController.updateById)
  .delete(requestValidatorMiddleware(productValidations.deleteById), middleware.basicAuth, middleware.productAuth, productController.deleteById);

router.route('/:productId/image')
  .get(requestValidatorMiddleware(productValidations.getProductImages), middleware.basicAuth, middleware.productAuth, productController.getProductImages)
  .post(upload.single('file'), multipartValidator.fileValidatorMiddleware, multipartValidator.imageValidatorMiddleware, requestValidatorMiddleware(productValidations.createProductImage), middleware.basicAuth, middleware.productAuth, productController.createProductImage);

router.route('/:productId/image/:image_id')
  .get(requestValidatorMiddleware(productValidations.fetchProductImage), middleware.basicAuth, middleware.productAuth, productController.fetchProductImage)
  .delete(requestValidatorMiddleware(productValidations.deleteProductImage), middleware.basicAuth, middleware.productAuth, productController.deleteProductImage)

export {
  router,
  path,
};
import httpStatus from 'http-status';
import _ from 'lodash';
import responseHandler from '../utils/responseHandler.js';

const fileValidatorMiddleware = (req, res, next) => {
  if(!req.file) {
    return responseHandler(res, 'Please choose file', httpStatus.BAD_REQUEST);
  }
  return next();
};

const imageValidatorMiddleware = (req, res, next) => {
    const allowedMimetypes = config.aws.s3_allowed_mimetype.split(",");
    if(!_.intersection(allowedMimetypes, [req.file.mimetype]).length){
        return responseHandler(res, 'Please choose a compatible filetype', httpStatus.BAD_REQUEST);
    }
    return next();
}

export default {
    fileValidatorMiddleware,
    imageValidatorMiddleware,
}

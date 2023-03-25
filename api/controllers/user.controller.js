import _ from 'lodash';

import userService from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';
import logger from '../logger/index.js';

const handleError = (res, error, message, trxId, userInfo = {}) => {
  if (error.errno) {
    if(error.message.toLowerCase().includes('password')) error.message = 'Database Error Detected';
    logger.error({
      message,
      error: error.message,
      userId: userInfo.id,
      username: userInfo.username,
      responseCode: 400,
      transactionId: trxId
    });
    return responseHandler(res, null, 400);
  } else {
    let errorCode = error.ecode ? error.ecode : 500;
    if(error.message.toLowerCase().includes('password')) error.message = 'Internal Server Error';
    logger.error({
      message,
      error: error.message,
      userId: userInfo.id,
      username: userInfo.username,
      responseCode: errorCode,
      transactionId: trxId
    });
    return responseHandler(res, null, errorCode);
  }
}

const fetchById = async (req, res) => {
  const userInfo = req.userInfo;
  const _id = req.params.userId;
  const trxId = req.trxId;
  try {
    const userData = await userService.fetchById(_id);
    logger.info({
      message: "Fetch User Data Success",
      userId: userInfo.id,
      username: userInfo.username,
      response: userData,
      transactionId: trxId
    });
    responseHandler(res, userData);
  } catch (error) {
    return handleError(res, error, "Error Occurred During Fetching User Data", trxId, userInfo);
  }
};

const create = async (req, res) => {
  const userInfo = req.body;
  const trxId = req.trxId;
  if (_.isEmpty(userInfo)) {
    logger.info({
      message: "Empty Request Body Received, Rejecting Request",
      responseCode: 204,
      transactionId: trxId
    });
    return responseHandler(res, null, 204);
  }
  try {
    const dbResponse = await userService.create(userInfo, trxId);
    logger.info({
      message: "Create User Success",
      userId: dbResponse.id,
      username: dbResponse.username,
      response: dbResponse,
      responseCode: 201,
      transactionId: trxId
    });
    responseHandler(res, dbResponse, 201);
  } catch (error) {
    return handleError(res, error, "Error Occurred During Create User", trxId, userInfo);
  }
};

const updateById = async (req, res) => {
  const _id = req.params.userId;
  const userInfo = req.userInfo;
  const userData = req.body;
  const trxId = req.trxId;
  if (_.isEmpty(userInfo)) {
    logger.info({
      message: "Empty Request Body Received, Rejecting Request",
      userId: req.params.userId,
      responseCode: 204,
      transactionId: trxId
    });
    return responseHandler(res, null, 204);
  }
  try {
    await userService.updateById(_id, userData, trxId);
    logger.info({
      message: "Update User Success",
      userId: req.params.userId,
      username: userInfo.username,
      responseCode: 204,
      transactionId: trxId
    });
    responseHandler(res, null, 204);
  } catch (error) {
    return handleError(res, error, "Error Occurred During Update User Data", trxId, userInfo);
  }
};

export default {
  fetchById,
  create,
  updateById,
};

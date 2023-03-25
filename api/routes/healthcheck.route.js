import express from 'express';
import logEntryPoint from '../middlewares/log.middleware.js';
import logger from '../logger/index.js';
const router = express.Router();
const path = '/healthz';

router.route('/')
    .get(logEntryPoint, async (req, res)=>{
      try {
        logger.info({message: "Health Check Successful", transactionId: req.trxId, responseCode: 200});
        res.status(200).send();
      } catch (e) {
        logger.info({message: "Health Check Failure", transactionId: req.trxId, responseCode: 503, error: e.message});
        res.status(503).send();
      }
    });

export {
  router,
  path,
};
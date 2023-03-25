import lynx from 'lynx';
import {
    v4 as uuidv4
} from 'uuid';
import logger from '../logger/index.js';

const metrics = new lynx(config.statsd.host, config.statsd.port);

const logEntryPoint = (req, res, next) => {
    if (req.originalUrl) {
        const regex = /\/(?!v1\/)[0-9]+\b/g;
        const replacedPath = req.originalUrl.replace(regex, "/{id}");
        metrics.increment(`${req.method} ${replacedPath}`);
    }
    if (req.url != '/healthz') req.trxId = 'trx-' + uuidv4();
    const reqBody = {
        ...req.body
    };
    delete reqBody.password;
    logger.info({
        message: "Received API Request",
        userId: req.params.userId || null,
        productId: req.params.productId || null,
        imageId: req.params.imageId || null,
        transactionId: req.trxId,
        data: reqBody || null,
        method: req.method,
        url: req.originalUrl
    });
    next();
}

export default logEntryPoint;
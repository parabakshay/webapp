import winston from 'winston';
import _conf from '../../config/index.js';

const {
    format,
} = winston;

const {
    combine,
    timestamp,
    json,
} = winston.format;

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
    all: 6
};

let logger;

const ignoreNullValues = format((info) => {
    const ignoreKeys = [];
    Object.keys(info).forEach((key) => {
      if (info[key] === null) {
        ignoreKeys.push(key);
      }
    });
    ignoreKeys.forEach((key) => delete info[key]);
    return info;
  });

(async function initLogLevels() {
    logger = winston.createLogger({
        levels: logLevels,
        level: _conf.logger.level || 'info',
        format: combine(timestamp(), ignoreNullValues(), json()),
        transports: [
            new winston.transports.File({
                filename: _conf.logger.dir + 'app.log',
            }),
        ],
    })

    if (_conf.app.env !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }
}());

export default logger;

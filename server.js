// import config from './config/index.js';
import stoppable from 'stoppable';
import app from './api/app.js';
import http from 'http';
import mysql from 'mysql2/promise';

import * as dotenv from 'dotenv';
dotenv.config();

import _conf from './config/index.js';
global.config = _conf;

import logger from './api/logger/index.js';
import migration from './dbMigrations/migration.js';

const httpServer = http.createServer(app);

const initMySQLConn = async () => {
    let dbConf = config.db;
    try {
        global.dbConn = await mysql.createPool({
        host: dbConf.host,
        user: dbConf.user,
        port: dbConf.port,
        password: dbConf.password,
        database: dbConf.dbName,
        waitForConnections: dbConf.waitForConnections,
        connectionLimit: dbConf.connectionLimit,
        maxIdle: dbConf.maxIdle,
        idleTimeout: dbConf.idleTimeout,
        queueLimit: dbConf.queueLimit
    });
    dbConn.on('acquire', function (connection) {
        console.log('DB Connection %d acquired', connection.threadId);
    });
    dbConn.on('release', function (connection) {
        console.log('DB Connection %d released', connection.threadId);
    });
    await dbConn.query('SELECT 1 + 1 AS solution');
    } catch (error) {
        logger.fatal({message: "Database Connection Failure Detected", error: error.message});
        throw error;
    }
};

const server = stoppable(
    httpServer.listen(config.app.port, async () => {
        await initMySQLConn();
        logger.info({message: 'WebApp connected to MySQL DB'});
        await migration.bootstrapDB();
        logger.info({message: `Server listening on port ${config.app.port}`});
    }));

const shutdown = () => {
    server.close((err) => {
        if (err) {
            logger.error('Error detected during process shutdown', err);
            process.exitCode = 1;
        }
        dbConn.end(function (err) {
            if (err) logger.error('Error detected while releasing db connections', err);
            else logger.info("All db connections in the pool are released") 
          });
        process.exit();
    });
};

// Quit on CTRL - C when running Docker in Terminal
process.on('SIGINT', () => {
    logger.info('Received SIGINT, gracefully shutting down');
    shutdown();
});

// Quit on docker stop command
process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, gracefully shutting down');
    shutdown();
});

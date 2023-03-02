import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Umzug, SequelizeStorage } = require('umzug');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const bootstrapDB = async () => {
    const sequelize = new Sequelize(
        config.db.dbName,
        config.db.user,
        config.db.password,
        {
            host: config.db.host,
            port: config.db.port,
            dialect: config.db.dialect,
        });
    
    const umzug = new Umzug({
        migrations: {
            glob: ['migrations/*.{js,cjs,mjs}', { cwd: path.dirname(import.meta.url.replace('file://', '')) }],
            resolve: params => {
                if (params.path.endsWith('.mjs') || params.path.endsWith('.js')) {
                    const getModule = () => import(`file:///${params.path.replace(/\\/g, '/')}`)
                    return {
                        name: params.name,
                        path: params.path,
                        up: async upParams => (await getModule()).up(upParams),
                        down: async downParams => (await getModule()).down(downParams),
                    }
                }
                return {
                    name: params.name,
                    path: params.path,
                    ...require(params.path),
                }
            }
        },
        context: { sequelize, DataTypes },
        storage: new SequelizeStorage({
            sequelize,
        }),
    });
    await umzug.up();
}

export default {
    bootstrapDB,
};
import _ from 'lodash';
import ProductModel from '../models/product.model.js';

const fetchById = async (_id) => {
    const productInfo = await ProductModel.findOne(_id);
    if(_.isEmpty(productInfo)){
        throw {
            message: "Requested resource not present",
            errorCode: 404
        }
    }
    return productInfo;
};

const create = async (productInfo) => {
    await ProductModel.insertOne(productInfo);
    const dbResponse = await ProductModel.findBySkuId(productInfo.sku);
    if(_.isEmpty(dbResponse)){
        throw {
            message: "Requested resource not present",
            errorCode: 404
        }
    }
    return dbResponse;
};

const updateById = async (productInfo, _id) => {
    const metaData = await ProductModel.updateById(productInfo, _id);
    if(!metaData.affectedRows) {
        throw {
            message: "Resource requested for update activity not present",
            errorCode: 404,
        }
    }
    return;
};

const deleteById = async (_id) => {
    const metaData = await ProductModel.deleteById(_id);
    if(!metaData.affectedRows) {
        throw {
            message: "Resource requested for delete activity not present",
            errorCode: 404,
        }
    }
    return;
};

export default {
    fetchById,
    create,
    updateById,
    deleteById,
};
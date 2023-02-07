import ProductModel from '../models/product.model.js';

const fetchById = async (_id) => {
    return await ProductModel.findOne(_id);
};

const create = async (productInfo) => {
    return await ProductModel.insertOne(productInfo);
};

const updateById = async (productInfo, _id) => {
    return await ProductModel.updateById(productInfo, _id);
};

const patchById = async(productInfo, _id) => {
    return await ProductModel.updateById(productInfo, _id);
}

export default {
    fetchById,
    create,
    updateById,
    patchById
};
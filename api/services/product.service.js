import _ from 'lodash';
import fs from 'fs';

import {
    PutObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

import {
    s3Client
} from "../utils/s3Client.js";
import ProductModel from '../models/product.model.js';
import ImageModel from '../models/image.model.js';
import logger from '../logger/index.js';

const deleteAllImages = async (productId, trxId) => {
    const imageInfo = await ImageModel.fetchAllImages(productId);
    if (_.isEmpty(imageInfo)) {
        logger.info({message: "No Images Found Uploaded Against This Product, Proceeding To Delete Product", productId, transactionId: trxId});
        return;
    }
    logger.info({message: `${imageInfo.length} Images Found Uploaded Against This Product, Deleting Images Before Deleting Product`, productId, transactionId: trxId});
    const deleteParams = {
        Bucket: config.aws.s3bucket,
        Delete: {
            Objects: []
        }
    };
    const s3_max_delete_count = config.aws.s3_max_delete_count;
    for (let i = 0; i < imageInfo.length; i += s3_max_delete_count) {
        const objects = imageInfo.slice(i, i + s3_max_delete_count).map((_each) => ({
            Key: _each.s3_bucket_path
        }));
        deleteParams.Delete.Objects = objects;
        await s3Client.send(new DeleteObjectsCommand(deleteParams));
        await ImageModel.deleteAllImages(productId);
        logger.info({message: `${imageInfo.length} Images Deleted Uploaded Against This Product, Proceeding To Delete Product`, productId, transactionId: trxId});
    }
    return;
};

const fetchById = async (_id) => {
    const productInfo = await ProductModel.findOne(_id);
    if (_.isEmpty(productInfo)) {
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
    if (_.isEmpty(dbResponse)) {
        throw {
            message: "Requested resource not present",
            errorCode: 404
        }
    }
    return dbResponse;
};

const updateById = async (productInfo, _id) => {
    const metaData = await ProductModel.updateById(productInfo, _id);
    if (!metaData.affectedRows) {
        throw {
            message: "Resource requested for update activity not present",
            errorCode: 404,
        }
    }
    return;
};

const deleteById = async (_id, trxId) => {
    await deleteAllImages(_id, trxId);
    const metaData = await ProductModel.deleteById(_id);
    if (!metaData.affectedRows) {
        throw {
            message: "Resource requested for delete activity not present",
            errorCode: 404,
        }
    }
    return;
};

const getProductImages = async (_id) => {
    const imageData = await ProductModel.getProductImages(_id);
    if (_.isEmpty(imageData)) {
        throw {
            message: "Requested resource(s) not present",
            errorCode: 404
        }
    }
    return imageData;
};

const fetchProductImage = async (productId, image_id) => {
    const imageData = await ProductModel.fetchProductImage(productId, image_id);
    if (_.isEmpty(imageData)) {
        throw {
            message: "Requested resource not present",
            errorCode: 404
        }
    }
    return imageData;
};

const createProductImage = async (req) => {
    const filenameLength = 255;
    const originalname = req.file.originalname;
    const file_name = originalname.length > filenameLength ? originalname.length(0, filenameLength) : originalname;
    const Key = `product_${req.params.productId}/${req.file.filename}`;
    const params = {
        Bucket: config.aws.s3bucket,
        Key,
        Body: fs.readFileSync(req.file.path),
        ContentType: req.file.mimetype,
    };
    await s3Client.send(new PutObjectCommand(params));
    await ImageModel.insertOne({
        product_id: req.params.productId,
        file_name,
        s3_bucket_path: Key,
    });
    const imageData = await ImageModel.fetchByKey(Key);
    if (_.isEmpty(imageData)) {
        throw {
            message: "Requested resource not present",
            errorCode: 404
        }
    }
    return imageData;
};

const deleteProductImage = async (productId, image_id) => {
    const keyInfo = await ImageModel.fetchKey(productId, image_id);
    if (_.isEmpty(keyInfo)) {
        throw {
            message: "Requested resource not present",
            errorCode: 404
        }
    }
    const params = {
        Bucket: config.aws.s3bucket,
        Key: keyInfo.s3_bucket_path
    }
    await s3Client.send(new DeleteObjectCommand(params));
    await ImageModel.deleteImage(productId, image_id);
    return;
};

export default {
    fetchById,
    create,
    updateById,
    deleteById,
    getProductImages,
    fetchProductImage,
    createProductImage,
    deleteProductImage,
};
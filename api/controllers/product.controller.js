import productService from '../services/product.service.js';
import responseHandler from '../utils/responseHandler.js';
import logger from '../logger/index.js';

const handleGenericError = (res, errorObj, message, trxId, userInfo = {}, productInfo = {}, imageInfo = {}) => {
    const errorCode = errorObj.errorCode ? errorObj.errorCode : 500;
    const errorMessage = errorObj.message ? errorObj.message : 'INTERNAL SERVER ERROR';
    responseHandler(res, {
        errorMessage
    }, errorCode);
    return logger.error({
        message,
        error: errorMessage,
        userId: userInfo.id || null,
        username: userInfo.username || null,
        sku: productInfo.sku || null,
        productId: productInfo.id || null,
        imageId: imageInfo.id || null,
        imageFileName: imageInfo.originalname || null,
        responseCode: errorCode,
        transactionId: trxId
    });
};

const fetchById = async (req, res) => {
    const trxId = req.trxId;
    try {
        const data = await productService.fetchById(req.params.productId);
        responseHandler(res, data, 200);
        return logger.info({
            message: "Fetch Product Data Successful",
            productId: data.id,
            sku: data.sku,
            responseCode: 200,
            response: data,
            transactionId: trxId
        });
    } catch (error) {
        return handleGenericError(res, error, "Error Occurred While Fetching Product Data", trxId, {}, {});
    }
};

const create = async (req, res) => {
    const trxId = req.trxId;
    const productInfo = {
        ...req.body,
        owner_user_id: req.userInfo.id,
    }
    const userInfo = {
        ...req.userInfo
    };
    try {
        const data = await productService.create(productInfo);
        responseHandler(res, data, 201);
        return logger.info({
            message: "Create Product Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: data.id,
            sku: data.sku,
            responseCode: 201,
            response: data,
            transactionId: trxId
        });
    } catch (error) {
        if (error.errno && error.errno === 1062) {
            const data = {
                message: error.message
            };
            responseHandler(res, data, 400)
            return logger.error({
                message: "Error Occurred While Creating Product Data",
                error: error.message,
                userId: userInfo.id,
                username: userInfo.username,
                sku: productInfo.sku,
                productId: req.params.productId,
                responseCode: 400,
                transactionId: trxId
            });
        }
        return handleGenericError(res, error, "Error Occurred While Creating Product", trxId, userInfo, productInfo);
    }
};

const updateById = async (req, res) => {
    const trxId = req.trxId;
    const userInfo = {
        ...req.userInfo
    };
    try {
        await productService.updateById(req.body, req.params.productId);
        responseHandler(res, null, 204);
        return logger.info({
            message: "Update Product Data Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: req.params.productId,
            sku: req.body.sku,
            responseCode: 204,
            transactionId: trxId
        }); 
    } catch (error) {
        if (error.errno && error.errno === 1062) {
            const data = {
                message: error.message
            };
            responseHandler(res, data, 400)
            return logger.error({
                message: "Error Occurred While Updating Product Data",
                error: error.message,
                userId: userInfo.id,
                username: userInfo.username,
                sku: req.body.sku,
                productId: req.params.productId,
                responseCode: 400,
                transactionId: trxId
            });
        }
        return handleGenericError(res, error, "Error Occurred While Updating Product Data", trxId, userInfo, {
            ...req.body,
            id: req.params.productId
        });
    }
};

const patchById = async (req, res) => {
    const trxId = req.trxId;
    const userInfo = {
        ...req.userInfo
    };
    try {
        await productService.updateById(req.body, req.params.productId);
        responseHandler(res, null, 204);
        return logger.info({
            message: "Update Product Data Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: req.params.productId,
            sku: req.body.sku,
            responseCode: 204,
            transactionId: trxId
        });
    } catch (error) {
        if (error.errno && error.errno === 1062) {
            const data = {
                message: error.message
            };
            responseHandler(res, data, 400)
            return logger.error({
                message: "Error Occurred While Updating Product Data",
                error: error.message,
                userId: userInfo.id,
                username: userInfo.username,
                sku: req.body.sku,
                productId: req.params.productId,
                responseCode: 400,
                transactionId: trxId
            });
        }
        return handleGenericError(res, error, "Error Occurred While Updating Product Data", trxId, userInfo, {
            ...req.body,
            id: req.params.productId
        });
    }
};

const deleteById = async (req, res) => {
    const trxId = req.trxId;
    const userInfo = {
        ...req.userInfo
    };
    try {
        await productService.deleteById(req.params.productId, trxId);
        responseHandler(res, null, 204);
        return logger.info({
            message: "Delete Product Data Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: req.params.productId,
            responseCode: 204,
            transactionId: trxId
        });
    } catch (error) {
        return handleGenericError(res, error, "Error Occurred While Deleting Product Data", trxId, userInfo, {
            id: req.params.productId
        });
    }
};

const getProductImages = async (req, res) => {
    const trxId = req.trxId;
    const userInfo = {
        ...req.userInfo
    };
    try {
        const data = await productService.getProductImages(req.params.productId);
        responseHandler(res, data, 200);
        return logger.info({
            message: "Fetch Product Image Data Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: req.params.productId,
            responseCode: 200,
            response: data,
            transactionId: trxId
        });
    } catch (error) {
        return handleGenericError(res, error, "Error Occurred While Fetching Product Images", trxId, userInfo, {
            id: req.params.productId
        });
    }
}

const createProductImage = async (req, res) => {
    const trxId = req.trxId;
    const userInfo = {
        ...req.userInfo
    };
    try {
        const data = await productService.createProductImage(req);
        responseHandler(res, data, 201);
        return logger.info({
            message: "Upload Product Image Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: req.params.productId,
            imageFileName: req.file.originalname,
            responseCode: 201,
            response: data,
            transactionId: trxId
        });
    } catch (error) {
        return handleGenericError(res, error, "Error Occurred While Uploading Product Image", trxId, userInfo, {
            id: req.params.productId
        }, {...req.file});
    }
}

const fetchProductImage = async (req, res) => {
    const trxId = req.trxId;
    const userInfo = {
        ...req.userInfo
    };
    try {
        const data = await productService.fetchProductImage(req.params.productId, req.params.image_id);
        responseHandler(res, data, 200);
        return logger.info({
            message: "Fetch Product Image Data Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: req.params.productId,
            imageId: req.params.image_id,
            responseCode: 200,
            response: data,
            transactionId: trxId
        });
    } catch (error) {
        return handleGenericError(res, error, "Error Occurred While Fetching Product Image", trxId, userInfo, {
            id: req.params.productId
        },  {id: req.params.image_id});
    }
}

const deleteProductImage = async (req, res) => {
    const trxId = req.trxId;
    const userInfo = {
        ...req.userInfo
    };
    try {
        await productService.deleteProductImage(req.params.productId, req.params.image_id);
        responseHandler(res, null, 204);
        return logger.info({
            message: "Delete Product Image Successful",
            userId: userInfo.id,
            username: userInfo.username,
            productId: req.params.productId,
            imageId: req.params.image_id,
            responseCode: 204,
            transactionId: trxId
        });
    } catch (error) {
        return handleGenericError(res, error, "Error Occurred While Deleting Product Image", trxId, userInfo, {
            id: req.params.productId
        }, {id: req.params.image_id});
    }
}

export default {
    fetchById,
    create,
    updateById,
    patchById,
    deleteById,
    getProductImages,
    createProductImage,
    fetchProductImage,
    deleteProductImage,
};
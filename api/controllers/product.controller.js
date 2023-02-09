import productService from '../services/product.service.js';
import responseHandler from '../utils/responseHandler.js';

const handleGenericError = (res, errorObj) => {
    const errorCode = errorObj.errorCode ? errorObj.errorCode : 500;
    const message = errorObj.message ? errorObj.message : 'INTERNAL SERVER ERROR';
    return responseHandler(res, { message }, errorCode);
};

const fetchById = async (req, res) => {
    try{
        const data = await productService.fetchById(req.params.productId);
        responseHandler(res, data, 200);
    } catch(error){
        return handleGenericError(res, error);
    }
};

const create = async (req, res) => {
    const productInfo = {
        ...req.body,
        owner_user_id: req.userInfo.id,
    }
    try{
        const data = await productService.create(productInfo);
        responseHandler(res, data, 201);
    } catch(error){
        if(error.errno && error.errno === 1062){
            const data = { message: error.message };
            return responseHandler(res, data, 400)
        }
        return handleGenericError(res, error);
    }
};

const updateById = async (req, res) => {
    try{
        await productService.updateById(req.body, req.params.productId);
        responseHandler(res, null, 204);
    } catch(error){
        if(error.errno && error.errno === 1062){
            const data = { message: error.message };
            return responseHandler(res, data, 400)
        }
        return handleGenericError(res, error);
    }
};

const patchById = async (req, res) => {
    try{
        await productService.updateById(req.body, req.params.productId);
        responseHandler(res, null, 204);
    } catch(error){
        if(error.errno && error.errno === 1062){
            const data = { message: error.message };
            return responseHandler(res, data, 400)
        }
        return handleGenericError(res, error);
    }
};

const deleteById = async (req, res) => {
    try{
        await productService.deleteById(req.params.productId);
        responseHandler(res, null, 204);
    } catch(error){
        return handleGenericError(res, error);
    }
};

export default {
    fetchById,
    create,
    updateById,
    patchById,
    deleteById
};
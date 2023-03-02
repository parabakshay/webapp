import Joi from 'joi';

const create = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string().required(),
		sku: Joi.string().required(),
        manufacturer: Joi.string().required(),
        quantity: Joi.number().integer().min(0).max(100).prefs({convert: false}).required(),
	}),
}

const fetchById = {
	params: Joi.object().keys({
		productId: Joi.number().integer().required(),
	}),
};

const updatePutById = {
    params: Joi.object().keys({
		productId: Joi.number().integer().required(),
	}),
    body: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string().required(),
		sku: Joi.string().required(),
        manufacturer: Joi.string().required(),
        quantity: Joi.number().integer().min(0).max(100).prefs({convert: false}).required(),
	}),
};

const updatePatchById = {
    params: Joi.object().keys({
		productId: Joi.number().integer().required(),
	}),
    body: Joi.object().keys({
		name: Joi.string(),
		description: Joi.string(),
		sku: Joi.string(),
        manufacturer: Joi.string(),
        quantity: Joi.number().integer().min(0).max(100).prefs({convert: false}),
	}),
};

const deleteById = {
    params: Joi.object().keys({
		productId: Joi.number().integer().required(),
	}),
};

const getProductImages = {
	params: Joi.object().keys({
		productId: Joi.number().integer().required(),
	}),
};

const createProductImage = {
	params: Joi.object().keys({
		productId: Joi.number().integer().required(),
	}),
};

const fetchProductImage = {
	params: Joi.object().keys({
		productId: Joi.number().integer().required(),
		image_id: Joi.number().integer().required(),
	}),
};

const deleteProductImage = {
	params: Joi.object().keys({
		productId: Joi.number().integer().required(),
		image_id: Joi.number().integer().required(),
	}),
};

export default {
    create,
    fetchById,
    updatePutById,
    updatePatchById,
    deleteById,
	getProductImages,
	createProductImage,
	fetchProductImage,
	deleteProductImage,
}
import Joi from 'joi';

const create = {
	body: Joi.object().keys({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		username: Joi.string().required(),
		password: Joi.string().required(),
	}),
}

const fetchById = {
	params: Joi.object().keys({
		userId: Joi.string().required(),
	}),
};

const updateById = {
	params: Joi.object().keys({
		userId: Joi.string().required(),
	}),
	body: Joi.object().keys({
		first_name: Joi.string(),
		last_name: Joi.string(),
		password: Joi.string()
	}),
};

export default {
	create,
	fetchById,
	updateById,
};

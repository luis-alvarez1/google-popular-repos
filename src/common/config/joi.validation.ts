import * as Joi from 'joi';

export const JoiEnvValidationSchema = Joi.object({
	PORT: Joi.number().default(3000),
	GITHUB_AUTH_KEY: Joi.string().required(),
});

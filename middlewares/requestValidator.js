const { validationResult } = require('express-validator');

module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    let errors = validationResult(req).formatWith(error => error.msg);
    if (errors.isEmpty()) {
      return next();
    }

		res.status(400)
			.json({
				message: 'Invalid Data',
				errors: errors.mapped()
			});
  };
};
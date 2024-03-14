const { request } = require("express");
const { validationResult } = require("express-validator");

const EmptyValidation = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    } catch (error) {
        next(error)
    }

};


module.exports = { EmptyValidation };

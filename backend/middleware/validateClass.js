const {body, validationResult} = require('express-validator');

const validateClass = [
    body('grade').notEmpty().withMessage('Grade is required'),
    body('subject').notEmpty().withMessage('Subject is required'),  
    body('date').notEmpty().withMessage('Date must be in ISO format'),
    body('description').notEmpty().isLength({min:10}).withMessage('Description must be at least 10 characters long'),
    body('privacy').notEmpty().isIn(['public', 'private']).withMessage('Privacy must be either public or private'),
    body('teacher').notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

module.exports = validateClass;
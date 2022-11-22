const validator = require('../helpers/validate');
const saveCourse = async (req, res, next) => {
    const validationRule = {
        "code": "required|string",
        "name": "required|string",
        "semester": "required|string",
        "year": "required|date",
        "status": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

const saveCertificate = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "year": "required|date",
        "status": "string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    saveCourse ,saveCertificate
};

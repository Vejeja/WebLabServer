const ApiError = require('./api-error');
module.exports = function (req, res) {
    const err = ApiError.NotFound(req.originalUrl);
    console.log(err);
    return res.status(404).json(err.message);
};
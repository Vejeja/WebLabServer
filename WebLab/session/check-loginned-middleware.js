const apiError = require('../error-handlig/api-error');

module.exports = function (req, res, next) {
    try {
        const session = req.session;
        if (session == undefined) throw apiError.UnauthorizedError();
        next();
    } catch (e) {
        next(e);
    }
};
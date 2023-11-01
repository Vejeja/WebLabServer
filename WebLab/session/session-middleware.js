const sessionService = require('./session-service');

module.exports = function (req, res, next) {
    try {
        var sessionId = req.headers['sessid'];
        req.session = sessionService.getSession(sessionId);
        next();
    } catch (e) {
        next(e);
    }
};
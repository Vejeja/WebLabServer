const service = require('./auth-service');
const apiError = require('../../../error-handlig/api-error');

class AuthController {

    async register(req, res, next){
        try {
            const login = req.body.login;
            if (login==undefined) throw apiError.BadRequest('Need login');
            const password = req.body.password;
            if (password==undefined) throw apiError.BadRequest('Need password');
            await service.register(login, password);
            return res.json('Success.');
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next){
        try {
            const login = req.body.login;
            if (login==undefined) throw apiError.BadRequest('Need login');
            const password = req.body.password;
            if (password==undefined) throw apiError.BadRequest('Need password');
            const sessionId = await service.login(login, password);
            res.header('Content-Type', 'application/json;charset=UTF-8')
            res.header('Access-Control-Allow-Credentials', true)
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            )
            res.cookie('SESSID', sessionId, {httpOnly: false});
            return res.json({'SESSID':sessionId});
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            await service.logout(req.session);
            res.clearCookie('SESSID');
            return res.json('Success');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
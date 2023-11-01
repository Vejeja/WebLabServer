const service = require('./user-service');

class UserController {
    
    async getMoney(req, res, next) {
        try {
            if (req.session == undefined) return res.json('_');
            const money = await service.getMoney(req.session);
            return res.json(money);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();

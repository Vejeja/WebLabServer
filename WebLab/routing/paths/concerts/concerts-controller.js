const service = require('./concerts-service');

class ConcertsController {
    
    async getAll(req, res, next) {
        try {
            const result = await service.getAll();
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const result = await service.getOne(req.params.id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new ConcertsController();

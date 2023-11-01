const service = require('./tickets-service');
const apiError = require('../../../error-handlig/api-error');

class TicketsController {
    
    async buyTicket(req, res, next) {
        try {
            const concert = req.body.concert;
            if (concert==undefined) throw apiError.BadRequest('Need concert.');
            const ticket_type = req.body.ticket_type;
            if (ticket_type==undefined) throw apiError.BadRequest('Need ticket_type.');
            await service.buyTicket(req.session, concert, ticket_type);
            return res.json("Success");
        } catch (e) {
            next(e);
        }
    }

    async getTickets(req, res, next) {
        try {
            const result = await service.getTicket(req.session);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TicketsController();

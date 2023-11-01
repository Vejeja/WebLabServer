const db = require('../../../db/db-proxy');
const apiError = require('../../../error-handlig/api-error');

class TicketsService {

    async buyTicket(session, concert, ticketType) {
        const decreaseCountQuery = `
        UPDATE concerts_tickets SET count=count-1
        WHERE concert=$1 AND ticket_type=$2 AND count > 0
        RETURNING id;
        `;
        const decreaseCountResult = await db.query(decreaseCountQuery, [concert, ticketType]);
        if (decreaseCountResult.length == 0) throw apiError.Conflict('Нет билетов.');
        const insertTicketQuery = `
        INSERT INTO tickets(concert, type, "user")
        VALUES ($1, $2, $3)
        RETURNING id;
        `;
        const insertTicketResult = await db.query(insertTicketQuery, [concert, ticketType, session['user_id']]);
        if (insertTicketResult.length == 0) {
            await db.query(`
            UPDATE concerts_tickets SET count=count+1
            WHERE concert=$1 AND ticket_type=$2
            `, [concert, ticketType]);
            throw new Error('Ошибка покупки билета.');
        }
    }

    async getTicket(session) {
        const query = `
        SELECT 
            t.id,
            t.concert,
            c.name AS concert_name,
            to_char(c.date, 'YYYY-MM-DD HH24:MI:SS') AS time,
            t.type,
            tt.name AS ticket_name
        FROM tickets t
        LEFT JOIN ticket_types tt ON t.type=tt.id
        LEFT JOIN concerts c ON t.concert = c.id
        WHERE "user"=$1
        `;
        const result = await db.query(query, [session['user_id']]);
        return result;
    }
}

module.exports = new TicketsService();

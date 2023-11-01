const db = require('../../../db/db-proxy');
const fs = require('fs');
var path = require('path');

class ConcertsService {

    async getAll(){
        const query = `
        SELECT
            concerts.id,
            name,
            to_char(date, 'YYYY-MM-DD HH24:MI:SS')  AS time,
            address,
            band,
            image,
            COALESCE(tickets, json_build_array()) AS tickets
        FROM concerts
        LEFT JOIN
        (
            SELECT concert, json_agg(json_build_object('type',ct.ticket_type,'count',ct.count,'name',tt.name)) AS tickets
            FROM concerts_tickets ct
            JOIN ticket_types tt ON ct.ticket_type=tt.id
            GROUP BY ct.concert
        ) ct ON concerts.id = ct.concert;
        `;
        const result = await db.query(query);
        for (const concert of result) {
            const path = concert.image;
            let image;
            try {
                image = toBase64(__dirname+'\\..\\..\\..\\images\\'+path);
            } catch (e) {
                image = null;
            }
            concert.image = image;
        }
        return result;
    }

    async getOne(id) {
        const query = `
        SELECT
            concerts.id,
            name,
            to_char(date, 'YYYY-MM-DD HH24:MI:SS') AS time,
            address,
            band,
            image,
            COALESCE(tickets, json_build_array()) AS tickets
        FROM concerts
        LEFT JOIN
        (
            SELECT concert, json_agg(json_build_object('type',ticket_type,'count',count)) AS tickets
            FROM concerts_tickets GROUP BY concert
        ) ct ON concerts.id = ct.concert
        WHERE concerts.id = 1;
        `;
        const result = await db.query(query, [id]);
        return result;
    }
}

function toBase64(filePath) {
    const img = fs.readFileSync(filePath);
    return Buffer.from(img).toString('base64');
}

module.exports = new ConcertsService();

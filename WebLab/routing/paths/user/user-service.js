const db = require('../../../db/db-proxy');

class UserService {

    async getMoney(session) {
        const userId = session['user_id'];
        const query = `SELECT money FROM users WHERE id=$1`;
        const qresult = await db.query(query, [userId]);
        const money = qresult[0]['money'];
        return money;
    }

}

module.exports = new UserService();

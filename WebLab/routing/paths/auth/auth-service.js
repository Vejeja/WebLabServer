const db = require('../../../db/db-proxy');
const bcrypt = require('bcrypt');
const apiError = require('../../../error-handlig/api-error');
const sessionService = require('../../../session/session-service');

class AuthService {

    async register(login, password) {
        const checkQuery = `SELECT count(*)>=1 AS existing FROM users WHERE login=$1;`;
        const checkResult = await db.query(checkQuery, [login]);
        if (checkResult[0]['existing']) throw apiError.Conflict('Пользователь уже существует.');
        var hashedPassword = bcrypt.hashSync(password, 10);
        const createQuery = `INSERT INTO users(login, password, money) VALUES ($1, $2, 0);`;
        await db.query(createQuery, [login, hashedPassword]);
    }

    async login(login, password) {
        const query = 'SELECT id, password FROM users WHERE login=$1;';
        const qresult = await db.query(query, [login]);
        if (qresult.length == 0) throw apiError.UnauthorizedError('Пользователь не найден.');
        const hashedPassword = qresult[0]['password'];
        const isPassEquals = await bcrypt.compare(password, hashedPassword);
        if (!isPassEquals) throw apiError.UnauthorizedError('Неверный пароль.');
        const sessionId = sessionService.startSession();
        sessionService.getSession(sessionId)['user_id'] = qresult[0]['id'];
        return sessionId;
    }

    async logout(session){
        sessionService.stopSession(session);
    }

}


module.exports = new AuthService();
const { v4 } = require('uuid');

class SessionsService {
    static sessions = {};
    
    static startSession() {
        const id = v4();
        this.sessions[id] = {};
        return id;
    }

    static getSession(sessionId) {
        return this.sessions[sessionId];
    }

    static stopSession(sessionId) {
        delete this.sessions[sessionId];
    }

}

module.exports = SessionsService;

module.exports = class ApiError extends Error {
    status;

    constructor(status, message) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }
    static UnauthorizedError(message="") {
        return new ApiError(401, message == "" ? 'Пользователь не авторизован' : message)
    }
    static NotFound(apiRequested){
        return new ApiError(404, `Обращение к несуществующему API ${apiRequested} .`);
    }
    static Conflict(message){
        return new ApiError(409, message);
    }

}

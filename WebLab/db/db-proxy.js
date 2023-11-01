const connection = require('./db-conn');

async function query(queryString, params=[]) {
    const paramInserts = queryString.match(/\$[0-9]+/g);
    if (paramInserts != null) {
        for (const specificParam of paramInserts) {
            const index = Number(specificParam.slice(1))-1;
            let paramValue = params[index];
            if ((typeof paramValue) == 'string') {
                paramValue = `'${paramValue.replaceAll("'", "''")}'`;
            }
            queryString = queryString.replaceAll(specificParam, paramValue);
        }
    }
    return (await connection.result(queryString)).rows;
}

module.exports = {
    query: query
}

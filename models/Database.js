import mysql from 'mysql'

export default class Database {
    #connection
    constructor(config) {
        this.#connection = mysql.createConnection(config)
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.#connection.query(sql, args, (error, results) => {
                if (error) {
                    reject(error)
                }

                resolve(results)
            })
        })
    }
}

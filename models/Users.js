import bcrypt from 'bcrypt'

import Database from './Database.js'

export default class Users {
    #db
    constructor(config) {
        this.#db = new Database(config)
    }
    async getData(login) {
        try {
            const query = await this.#db.query(
                `SELECT login, email FROM users WHERE login = '${login}'`
            )

            if (!query.length) {
                throw 'not exists'
            }

            return {...query[0]}
        } catch {
            return null
        }
    }
    async login({ login, password }) {
        try {
            const query = await this.#db.query(
                `SELECT * FROM users WHERE login = '${login}'`
            )

            if (!query.length) {
                throw 'not exists'
            }

            const hash = query[0].password

            if (!(await bcrypt.compare(password, hash))) {
                throw 'invalid password'
            }

            return true
        } catch {
            return false
        }
    }
    async register({ login, email, password }) {
        try {
            const loginResult = await this.#db.query(
                `SELECT * FROM users WHERE login = '${login}'`
            )

            if (loginResult.length) {
                throw 'exists'
            }

            const emailResult = await this.#db.query(
                `SELECT * FROM users WHERE login = '${login}'`
            )

            if (emailResult.length) {
                throw 'exists'
            }

            await this.#db.query(
                `INSERT INTO users (login, email, password) VALUE ('${login}', '${email}', '${password}')`
            )

            return true
        } catch {
            return false
        }
    }
}

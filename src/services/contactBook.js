'use strict'

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'pankaj',
    host: 'localhost',
    database: 'contactbool',
    password: 'password',
    port: 5432,
})

class ContactBook {
    static getContact() {
        const id = 1

        return pool.query('SELECT * FROM contacts').then((res) => {
            return res.rows;
        }).catch((error) => {
            throw error
        })
    };

    static async createContact(name, email, countryCode) {
        pool.query('INSERT INTO contacts (name, email, created_time, updated_time, country_code) VALUES ($1, $2, to_timestamp($3), to_timestamp($4), $5)', [name, email, Date.now(), Date.now(), countryCode]).then((res) =>{
            return res;
        }).catch((error) =>{
            throw error;
        })
    }

    static async deleteContact() {
        pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                return error;
            } else {
                return results;
            }
        })
    }

    static async updateContact() {
        pool.query(
            'UPDATE contacts SET name = $1, email = $2 WHERE id = $3',
            [name, email, id],
            (error, results) => {
                // if (error) {
                //     return error
                // }
                // response.status(200).send(`User modified with ID: ${id}`)
            }
        )
    }
}

module.exports = ContactBook

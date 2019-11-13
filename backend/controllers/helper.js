const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;

exports.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teamworkDB',
    password: 'pass1245',
    port: 5432,
});

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
};

/**
 * comparePassword
 * @param {string} hashPassword 
 * @param {string} password 
 * @returns {Boolean} return True or False
 */
exports.comparePassword = (hashPassword, password) => {
    return bcrypt.compareSync(password, hashPassword);
};
/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */

/**
 * Gnerate Token
 * @param {string} id
 * @returns {string} token
 */
exports.generateToken = (id) => {
    const token = jwt.sign({
            userId: id
        },
        'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
    );
    return token;
}

exports.isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};
exports.checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) => bcrypt.compare(reqPassword, foundUser, (error, response) => {
        if (error) {
            reject(error);
        } else if (response) {
            resolve(response);
        } else {
            reject(new Error('Password do not match'))
        }
    }))
}
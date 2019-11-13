const Pool = require('pg').Pool;
const helper = require('./helper');

const getUsers = (request, response) => {
    const queryString = 'SELECT * FROM users ORDER BY id ASC';
    helper.pool.query(queryString, (error, results) => {
        if (error) {
            // throw error;
        }
        response.status(200).json(results.rows);
    })
};
const signin = (request, response) => {
    const { email, upassword } = request.body;

    const queryString = 'SELECT * FROM users WHERE email = $1';

    pool.query(queryString, [email], (error, results) => {
        if (error) {
            // throw error;
            return response.status(500).json({
                message: "email not found",
                error: error
            })
        }
        const data = results.rows[0];
        if (!data) {
            return response.status(500).json({
                message: "email not found",
                error: error
            });
        }
        helper.checkPassword(upassword, data.upassword)
            .then((error, feedback) => {
                if (error) {
                    console.log(error);
                }
                const token = helper.generateToken(data.id)
                response.status(200).json({
                    status: "Success",
                    token: token,
                    userId: data.id
                });
            }).catch((error) => {
                response.status(500).json({
                    error: error
                })
            })
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            //     throw error;
        }
        response.status(200).json({ results: 'Success!!' });
    })
};

const createUser = (request, response) => {
    const { firstname, lastname, email, gender, jobrole, department, address } = request.body;
    const upassword = helper.hashPassword(request.body.upassword);
    const queryString = 'INSERT INTO users (firstname, lastname, email, upassword, gender, jobrole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    pool.query(queryString, [firstname, lastname, email, upassword, gender, jobrole, department, address], (error, results) => {
        if (error) {
            return response.status(400).json({
                    message: 'fill in all field'
                })
                // throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    const queryString = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
    pool.query(queryString, [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    )
};




const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        // response.status(200).send(`User deleted with ID: ${id}`)
        response.status(200).json({ message: "success" });
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    signin,
    updateUser,
    deleteUser,
}
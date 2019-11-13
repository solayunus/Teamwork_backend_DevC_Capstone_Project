const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teamworkDB',
    password: 'pass1245',
    port: 5432,
});

//post article
const createGif = (request, response) => {
    const { title, imageurl } = request.body

    pool.query('INSERT INTO gifs (title, imageurl) VALUES ($1, $2)', [title, imageurl], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
};
//PATCH /edit gif 
const updateGif = (request, response) => {
    const id = parseInt(request.params.id);
    const { title, imageurl } = request.body;

    pool.query(
        'UPDATE gifs SET title = $1, imageurl = $2 WHERE id = $3', [title, imageurl, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    )
};
//delete gif
const deleteGif = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM gifs WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
};
//comment gif
const createGifComment = (request, response) => {
    // let d = new Date();
    // let createdOn = d.getTime();
    const { comment } = request.body;
    const gif_id = parseInt(request.params.id);
    pool.query('INSERT INTO comments (comment, gif_id) VALUES ($1, $2)', [comment, gif_id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
};
//get all comments
const getComments = (request, response) => {
    const gif_id = parseInt(request.params.id);
    pool.query('SELECT * FROM comments WHERE gif_id = $1', [gif_id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
};
//get gifs
const getGifs = (request, response) => {
    pool.query('SELECT * FROM gifs ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
};

module.exports = {
    getGifs,
    createGif,
    updateGif,
    deleteGif,
    createGifComment,
    getComments
};
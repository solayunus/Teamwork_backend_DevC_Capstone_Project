const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teamworkDB',
    password: 'pass1245',
    port: 5432,
});



const getFeed = (request, response) => {
    pool.query('SELECT articles.title, gifs.title, gifs.imageurl, articles.article, users.id FROM articles ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
};
module.exports = { getFeed };
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teamworkDB',
    password: 'pass1245',
    port: 5432,
});


//post article
const createArticle = (request, response) => {
    const { title, article } = request.body
    const queryString = 'INSERT INTO articles (title, article) VALUES ($1, $2)';
    pool.query(queryString, [title, article], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
};
//PATCH /edit article 
const updateArticle = (request, response) => {
    const id = parseInt(request.params.id);
    const { title, article } = request.body;

    pool.query(
        'UPDATE articles SET title = $1, article = $2 WHERE id = $3', [title, article, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    )
};
//delete article
const deleteArticle = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
};

//comment article
const createArticleComment = (request, response) => {
    const { comment } = request.body;
    const article_id = parseInt(request.params.id);
    pool.query('INSERT INTO comments (comment, article_id) VALUES ($1, $2)', [comment, article_id], (error, results) => {
        if (error) {
            console.log(error);
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
};
//get all comments on article
const getComments = (request, response) => {
    const article_id = parseInt(request.params.id);
    pool.query('SELECT * FROM comments WHERE article_id=$1', [article_id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
};

//get article
const getArticles = (request, response) => {
    pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
};
//get one article
const getOneArticle = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM articles WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
};


module.exports = {
    getArticles,
    getOneArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    createArticleComment,
    getComments
};
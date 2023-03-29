const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'user',
	host: 'localhost',
	database: 'db',
	port: '5432'
});

const getUsers = (request, response) => {
	pool.query("")
}
const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.POSTGRES_USER || 'user',
	host: 'postgres',
	database: 'db',
	password: 'pass',
	port: '5432'
});
console.log(pool);

const getUsers = (req, res) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		console.log(results);
		return results;
	});
}
module.exports = {
	getUsers
};
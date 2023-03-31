/**
 * @typedef User
 * @prop {number} id user's id
 * @prop {string} name user's name
 * @prop {string} email user's email
 */
const Pool = require('pg').Pool;

const pool = new Pool({
	user: process.env.POSTGRES_USER || 'user',
	host: 'postgres',
	database: 'db',
	password: 'pass',
	port: '5432'
});

/**
 * Get all users
 * @returns {Promise<User[]>} A promise to users
 */
const getUsers = () => {
	return pool.query('SELECT * FROM users ORDER BY id ASC')
		.then(results => {
			return results.rows;
		});
}

/**
 * Get a User by id
 * @param {number} id - user's id
 * @returns {Promise<User>} A promise to a user 
 */
const getUserById = (id) => {
	return pool.query('SELECT * FROM users WHERE id = $1', [id])
		.then(results => {
			return results.rows;
		});
}

/**
 * Create an user
 * @param {string} name new user's name 
 * @param {string} email  new user's email
 * @returns {number} new user's id
 */
const createUser = (name, email) => {
	return pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
		.then(results => results.rows[0].id);
}
module.exports = {
	getUsers,
	getUserById,
	createUser
};
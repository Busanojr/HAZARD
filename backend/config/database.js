// database.js
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
host: process.env.DB_HOST || 'auth-db1981.hstgr.io',
user: process.env.DB_USER || 'u442411629_dev_hazard',
password: process.env.DB_PASS || '9W0^5sAsc6B.',
database: process.env.DB_NAME || 'u442411629_hazard',
port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('✓ Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('✗ Database connection failed:', error.message);
        return false;
    }
};

/**
 * Execute a query with parameters
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
const query = async (sql, params = []) => {
    try {
        const [rows] = await promisePool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Database query error:', error.message);
        throw error;
    }
};

module.exports = {
    pool,
    promisePool,
    testConnection,
    query
};
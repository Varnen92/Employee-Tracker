const mysql = require('mysql2')

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'AstroYuffie',
        database: 'hr_tracker'
    },
    console.log('Connected to HR Tracker database.')
)

module.exports = db;
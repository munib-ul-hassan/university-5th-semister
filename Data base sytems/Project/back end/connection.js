var DB_connection = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_INSTANCE_NAME,
    
} 
module.exports = DB_connection
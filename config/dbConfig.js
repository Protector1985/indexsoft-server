

module.exports = {
    mysql: {
        options: {
                host: process.env.db_address,
                port: process.env.db_port, 
                database: "sys", 
                username: process.env.db_user, 
                password: process.env.db_pass, 
                dialect: process.env.db_dialect,   
                },
                client: null
            }    
    }
const Sequelize = require('sequelize')

function dbConnect(dbConfig) {
    const db = new Sequelize(dbConfig.mysql.options)
    try {
        db.authenticate().then(() => {
            dbConfig.mysql.client = db
        })
        console.log(`${db.config.database} DATABSE CONNECTED`)
        return db
    } catch (error) {
        console.log("DATABSE connection ERROR")
    }
}

module.exports = dbConnect;
const { DataTypes } = require("sequelize")
const Sequelize = require("sequelize")



module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        password: {
            type: DataTypes.CHAR(72),
            allowNull: false
        }
    })

    const Gender = sequelize.define("gender", {
        
        gender_id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    })

   
    Gender.hasMany(User, { foreignKey: 'gender_id'});
    sequelize.sync();
}
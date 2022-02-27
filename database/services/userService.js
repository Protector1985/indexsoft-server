const Models = require("../models/index.js")

class UserService{
    constructor(sequelize) {
        Models(sequelize)
        this.client = sequelize.client,
        this.models = sequelize.models    
    }

    async createUser(user_id, first_name, last_name, birthday, password, gender_id ) {
        try {
            const user = await this.models.user.create({
                user_id,
                first_name,
                last_name,
                birthday,
                password,
                gender_id, 
            });
            return {type:"SUCCESS", user: user};
        } catch (error) {
            console.log(error);
            return {type:"ERROR", msg: "USER_CREATE_ERROR"};
        }  
    }

    async fetchAll() {
        try {
            const users = await this.models.user.findAll();
            return ({type:"SUCCESS", users: users});
        } catch(error) {
            return {type:"ERROR", msg: "USERS_FETCH_ERROR"};
        }
    }

    async findOne(user_id) {
        try {
            const user = await this.models.user.findOne({where:{user_id: user_id}});
            return {type:"SUCCESS", user: user};
        } catch(error) {
            return {type:"ERROR", msg: "USER_NOT_FOUND"};
        }
    }

    async updateUser(user_id, first_name, last_name, birthday, gender_id) {
        try {
            const user = await this.models.user.update({first_name: first_name, last_name: last_name, birthday: birthday, gender_id: gender_id}, {where: {user_id: user_id}})
            return {type:"SUCCESS", user: user};
        } catch(error) {
            return {type:"ERROR", msg: "USER_UPDATE_ERROR"};
        }
    }

    async deleteUser(user_id) {
        try {
            const user = await this.models.user.destroy({where: {user_id: user_id}})
            return {type:"SUCCESS", user: user};
        } catch(error) {
            console.log(error);
            return {type:"ERROR", msg: "USER_DELETE_ERROR"};
        }
    }
}

module.exports=UserService
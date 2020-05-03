const Sequelize = require("sequelize");
const connection = require("../database/connection");

const User = connection.define('users',{
    email : {
        type: Sequelize.STRING,
        allowNull:false
    }, password:{ //nome personalizado para URL(personalized name for URL)
        type:Sequelize.STRING,
        allowNull:false
    }

})

//User.sync({force:false})
module.exports = User;
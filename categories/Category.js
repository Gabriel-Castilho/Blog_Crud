const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Category = connection.define('categories',{
    title : {
        type: Sequelize.STRING,
        allowNull:false
    }, slug:{ //nome personalizado para URL(personalized name for URL)
        type:Sequelize.STRING,
        allowNull:false
    }

})

Category.sync({force:false})
module.exports = Category;
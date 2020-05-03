const Sequelize=require("sequelize");
const connection = require("../database/connection");
//importing model category for relationship
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },slug:{
        type:Sequelize.STRING,
        allowNull:false
    },body:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})
Category.hasMany(Article); //a category for many articles
Article.belongsTo(Category); //an article belongs to a category


Article.sync({force:false})
module.exports=Article;

const Sequelize = require('sequelize');
const {db}=require('../config/database');

const Product = db.define('tbl_products',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    product:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
});

Product.sync({force:false}).then((res)=>{
    console.log("Product Table created");
}).catch((err)=>{
    console.log("Error while creating product table");
})

module.exports=Product;
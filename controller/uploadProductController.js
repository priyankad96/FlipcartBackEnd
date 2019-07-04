const Product = require('../schema/uploadProductSchema');
const db=require('../config/database');

exports.post = (body,done) => {
    console.log(body.product);
    Product.create(body).then((product)=>{
        if(product){
            done(null,product);
        }
    }).catch((err)=>{
        done(err);
    });
};

exports.getAll = (done)=>{
    Product.findAll().then((getproduct) => {
        if(getproduct){
            done(null,getproduct);
        }

    }).catch((err)=>{
        done(err);
    });
};

exports.getById = (id,done) => {
    Product.findOne({where:{id:id}}).then((getproduct) => {
        if(getproduct){
            Product.findAll({where:{id:id}}).then((product) => {
                done(null,product)
            }).catch((err)=>{
                done(err)
            })
        }
        else{
            done({message:"Id not found to update"})
        }
    })
}

exports.deleteById = (id,done) => {
    Product.findOne({where: {id:id}}).then((getproduct) => {
        if(getproduct){
            Product.destroy({where: {id:id}}).then((product)=>{
                done(null,product)
            }).catch((err) => {
                done(err)
            })
        }
        else{
            done({message: "Id not found"})
        }
    })
}

exports.updateById = (id,body,done) => {
    Product.update(body,{where: {id:id}}).then((updateproduct)=>{
        done(null,updateproduct)
    }).catch((err)=>{
        done(err)
    })
}
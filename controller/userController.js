const user = require('../schema/userSchema');
const {db} = require('../config/database');
const Sequelize = require('sequelize');

/*registration*/
exports.post = (body,done) => {
    user.findOne({where:{email: body.email}}).then((result) => {
        if(result) {
            done({message: 'Email Id Already Exist'});
        } else {
            user.create(body).then((newUser) => {
                if(newUser) {
                    done(null,newUser);
                } else {
                    done({message: 'User Not Created'});
                }
            }).catch((err) => {
                done(err);
            });
        }
    }).catch((err)=>{
        done(err);
    })
};

/*login*/
exports.postlogin = (body,done) => {
    user.findOne({where: {email: body.email}}).then((result) => {
        if(result) {
            done(null, result);
        }
        else {
            done(err);
        }
    }).catch((err) => {
        done(err);
    });
}


exports.get = (done) => {
    user.findAll({})
        .then((user) => {
        if (user) {
            done(null, user)
        }
    })
.catch(err => {
        console.log(err);
})
};

exports.put = (body, id, done) => {
    // const {userName}=body;
    db.query("update tbl_users set email = '" + body.userName + "' where uid = " + id + " ").then((userData) => {
        if (userData) {
            done(null, userData)
        }
    }).catch((err) => {
        console.log(err)
})
};

/*exports.put = (body, id, done) => {

    user.update(body,{where: { uid: id}}).then((userData) => {
        if (userData) {
            done(null, userData)
        }
    }).catch((err) => {
        console.log(err)
    })
};*/

exports.deleteUser = ( id, done) => {
    // const {userName}=body;
    db.query("delete from tbl_users where uid="+id).then((userData) => {
        if (userData) {
            done(null, userData)
        }
    }).catch((err) => {
        console.log(err)
})
};



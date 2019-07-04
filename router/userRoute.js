const {Router} = require('express')
var router = new Router()
const {post,postlogin, get, put, deleteUser} = require('../controller/userController');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);
var secretKey = 'STkey';
//const {user}=require('../schema/user.schema');


/*registration*/
router.post('/registration', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    console.log("body is", req.body)
    post(req.body, (err, result) => {
        if (err) {
            res.json(err)
            res.statusCode = 404;
            console.log(err)
        } else {
            res.json(result)
            res.statusCode = 200;
            console.log("result is", result)
        }
    })
});

/*login*/
router.post('/login', (req, res) => {
    postlogin(req.body, (err, result) => {
        if (err) {
            res.status(400).send({ message: 'Email ID Not Exist', result: false });
        } else {
            var hash = bcrypt.compareSync(req.body.password, result.password);
            if (hash) {
                var token = jwt.sign({ email: result.email }, secretKey, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ message: 'Login Successfully', result: true, token: token, role: result.role, id: result.uid });

            } else {
                res.status(400).send({ message: 'Password In Correct', result: false });
            }
        }
    });
});


router.get('/get', (req, res) => {
    get((err, result) => {
        if (err) {
            res.json(err)
            res.statusCode = 404;
            console.log(err)
        } else {
            res.json(result)
            res.statusCode = 200;
            console.log("result is", result)
        }
    })
});


router.put('/:id', (req, res) => {
    console.log(req.params.id)
    const uid = req.params.id;
    console.log("body is", req.body)
    put(req.body, req.params.id, (err, result) => {
        if (err) {
            res.json(err)
            res.statusCode = 404;
            console.log(err)
        } else {
            res.json(result)
            res.statusCode = 200;
            console.log("result is", result)
        }
    })
});

router.delete('/:id', (req, res) => {
    console.log("body is", req.body)
    deleteUser(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
            res.statusCode = 404;
            console.log(err)
        } else {
            res.json(result)
            res.statusCode = 200;
            console.log("result is", result)
        }
    })
});

module.exports = router;

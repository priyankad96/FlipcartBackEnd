const {Router} = require('express');
const router = Router();
const multer = require('multer');

const {post, getAll, getById, deleteById, updateById} = require('../controller/uploadProductController');
const path = require('path');

//store image in the folder
var storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imageUploads')
    },
    filename: (req, file, cb) => {
         cb(null, 'Image' + '-' + Date.now() + path.extname(file.originalname))
        //cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    },
    size:{
        width: 100,
        height: 100
    }
});

var upload = multer({storage:storage1});

//Add Data with Single image
router.post('/',upload.single('image'), (req,res,next)=>{
    console.log('***',req.body);
    req.body.image=req.file.filename;
   // req.body.image=req.file;
    console.log('+++',req.file);
    post(req.body,(err,result)=>{
        if(err){
            res.statusCode=400;
            res.json(err);
        }
        else{
            res.statusCode=200;
            res.json(result);
        }
    })
});



// //Add Data with Multiple image upload
// var upload = multer({storage:storage}).array('image',10);
// router.post('/',upload, (req,res,next)=>{
//     var pictures=[];
//     for(let picture of req.files){
//         pictures.push(picture.filename);
//     }
//     req.body.image=JSON.stringify(pictures);
//     post(req.body,(err,result)=>{
//         if(err){
//             res.statusCode=400;
//             res.json(err);
//         }
//         else{
//             res.statusCode=200;
//             res.json(result);
//         }
//     })
// });



//Get Data
router.get('/allproduct', (req, res) => {
    getAll((err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
});

//Get Data By ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    getById(id, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            console.log(result);
            res.json(result);

        }
    })
})

//Delete Data
router.delete('/deleteproduct/:id', (req, res) => {
    const id = req.params.id;
    deleteById(id, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
});

//Update Data
router.put('/updateproduct/:id',upload.single('image'), (req,res)=>{
//router.put('/updateproduct/:id', (req, res) => {
    console.log('**r',req.body);
    if( req.file ){
        req.body.image=req.file.filename;
    }
    updateById(req.params.id, req.body, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
})

module.exports = router;
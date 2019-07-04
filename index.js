var express = require('express');

const {db}=require('./config/database');
var cors = require('cors');
var path = require('path');
var app = express();

var ImageDir = path.join(__dirname, '/imageUploads');
app.use('/img',express.static(ImageDir));

var userRoute = require('./router/userRoute');
var productRoute=require('./router/uploadProductRoute');
//const {user}=require('./schema/user.schema');
app.use(cors());
app.get('/',(req,res)=>{
    res.end("hello start property backend")
})


const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
if (db){
    console.log("sucess")
} else {
    console.log("not")
}
//app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/product',productRoute);


app.listen(3010, (err) => {
    if (err) {
        console.log(err)
        console.log('Error in connecting with port 3010');
    } else {
        console.log('Server has been set up on port 3010');
}
});

const con = require('../dbConnection');

///////////////////////////////////////////////////////////////////
// ACCESS_TOKEN_SECRET= '1234';
//these must be in every route
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

// const jwt = require("jsonwebtoken");//sign and varifie jwt token
// require('dotenv').config();
const path = require("path");


///////
//this is just my try
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
/////////////////////////////////////////////

// //add user
// router.post("/", (req, res)=>{
//     // insert statment
//     let sql = "INSERT INTO user (username,password) VALUES(?,?)";
//     let val = [req.body.username, req.body.password];
//     // execute the insert statment
//     con.query(sql, val, function(err, result, fields){
//         if(err){
//             console.log("error in adding user")
//             res.send("error in adding user")
//         }else{
//             console.log("added from post  !!!!")
//             res.send("user aded")
//             //res.send({data: "the data"});
//         }
//     } );
// })

////////////////////////////////////////////////////////////////////////////
//login


router.post("/", (req, res)=>{ //we read the username then search if the password is the same
    
    let val = [req.body.username, req.body.password];
    let sql = "select * from user WHERE username =? ";

    con.query(sql,val, function(err, result, fields){
        if(err){
            console.log("error in login user" + err)
            // console.log(err)
            // res.send("error in login user")
        }else{
            // console.log("result[0].password", result[0].password)
            const user = result.find((user)=> user.username === req.body.username);
            const pass = result.find((pass)=> pass.password === req.body.password);
            // console.log("user.username =", user.username)
            // console.log("req.body.username =", req.body.username)
            // console.log("pass.password =", result[0].password)
            // console.log("req.body.password =", req.body.password)

            // if(result[0].password === req.body.password){
            //     console.log("i think ive started to understand ++ pass match")
            // }else{
            //     console.log("i think ive started to understand ++ pass no match")
            // }
            

            if (user){
                 if(pass){
                    console.log("user found ")
                    const found = 'found';
                    res.send('user');
                    // console.log("secretOrPrivateKey value:", ACCESS_TOKEN_SECRET);
                    // const jwtSecretKey = process.env.JWT_SECRET_KEY;
                    // console.log("hey  " , jwtSecretKey )
                    // const accessToken = jwt.sign(
                    //     {"username": user},
                    //     process.env.ACCESS_TOKEN_SECRET, 
                    //     {expiresIn: '50m'}
                    // );

                    // const refreshToken = jwt.sign(
                    //     {"username": user},
                    //     process.env.ACCESS_TOKEN_SECRET,
                    //     {expiresIn: '1d'}
                    // );

                    // const token = jwt.sign(
                    //     {"username": user},
                    //     process.env.ACCESS_TOKEN_SECRET,
                    //     {
                    //         expiresIn:"2h",
                    //     }
                    // )
                    // user.token= token;
                    // res.status(201).json(user);

                    //we have to save the refresh token in the database 
                    //will allow us th create a log out rout 
                    //it will invalidate the token when the user log out
                    //idk what that is but i should save the refresh token with the current user
 
                    //im sending the refresh token as a cookie in httponly form to make secure 
                    //cuz if i send it as anything else it could be seen to javascript 
                    //just a security thing
                    // res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
                    // res.json({accessToken});
                    // res.send(user);
                }else{
                    console.log("user not found ")
                    res.sendStatus(401);
                 }
                
            } else{
                console.log("user not found")
                // res.send('not found');
            }
        }
    })
})

///////////////////////////////////////////////////////////////////////////
// //the call back functon will be called whenever the user calls the route
// router.get("/users", (req, res)=>{
//     con.query("select * from user", function(err, result, fields){
//         if(err){
//             console.log(err)
//         }else{
//             // console.log("Connected !!!!")
//             res.send(result)
//         }
//     })
// })
///////////////////////////////////////////////////////////////////////////
module.exports = router;
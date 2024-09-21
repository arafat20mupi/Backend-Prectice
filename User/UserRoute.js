
const express= require('express')
const { register, login } = require('./UserController')

const route= express.Router()
    //   register route
    route.post('/register',register),
    //  login
   route.post('/login',login)



module.exports=route

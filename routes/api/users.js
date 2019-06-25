const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// Item model
const User = require('../../models/User');

// @route GET api/users
// @desc new users
// @acces Public por ahora
router.post('/', (req, res) => {
     const { name, email, password } = req.body;

     //validacion
     if(!name || !email || !password){
          return res.status(400).json( { msg: 'Ingrese todo los campos' });
     }
     //mirar que no exista ya uno
     User.findOne({ email })
     .then(user => {
     if(user) return res.status(400).json({ msg: 'Ya existe el usuario' });
     

     const newUser = new User({
          name,
          email,
          password
     });

     // Create salt & hash
     
     bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err,hash)=> {
               if(err) throw err;
               newUser.password = hash;
               newUser.save()
                .then(user => {
                    jwt.sign(
                         { id: user.id },
                         config.get('jwtSecret'),
                         { expiresIn: 3600 }, //el token expira es opcional
                         (err, token) =>{
                              if(err) throw err;
                              res.json({
                              token,
                                   user:{
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                              }
                         });
                     }
                    )
          });
     })
   })
})

});


module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
// Item model
const User = require('../../models/User');

// @route GET api/auth
// @desc auth user
// @acces Public por ahora
router.post('/', (req, res) => {
     const { email, password } = req.body;

     //validacion
     if(!email || !password){
          return res.status(400).json( { msg: 'Ingrese todo los campos' });
     }
     //mirar que no exista ya uno
     User.findOne({ email })
     .then(user => {
     if(!user) return res.status(400).json({ msg: 'Usuario no existe' });
    
    //validar password
    bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Credenciales incorrectas'});

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
        })
})

});
// @route GET request api/auth/user
// @desc get user data
// @acces private
router.get('/user', auth, (req, res)=>{
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;
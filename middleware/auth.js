const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');

    // ver el token
    if(!token) res.status(401).json({ msg: 'Autorizacion denegada' });

        try{
    //verificar el toquen
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //agregar usuario desde el payload
    req.user = decoded;
    next();
    }catch(e){
            res.status(400).json({ msg: 'El token no es valido' });
    }
    
}

module.exports = auth;
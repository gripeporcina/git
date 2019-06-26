const express = require('express');
const path = require('path');
const { connectDb } = require('./config/mongoose');

const app = express();

//boddy parser Middleware
app.use(express.json());

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// serve static asset si estamos en produccion
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
});
require('./models/user');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://Emmis:Emmisart@cluster0.sw1e4pr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance");
});

mongoose.connection.on('error', (err) => {
    console.log("Error connecting to mongo", err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
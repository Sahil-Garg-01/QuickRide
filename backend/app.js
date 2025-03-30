const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');   

const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userroute = require('./routes/user-route');
const captainroute = require('./routes/captain-route')
const cookieParser = require('cookie-parser');
const maproute=require('./routes/map-route')
const rideroute=require('./routes/ride-route')

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello from app.js!');
});

app.use('/users', userroute);
app.use('/captains',captainroute)
app.use('/maps',maproute)
app.use('/rides',rideroute)

module.exports = app;
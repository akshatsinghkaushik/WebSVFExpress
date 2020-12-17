const express = require('express');
var cors = require('cors');
const app = express();

//Express Middlewares
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Import Routes
require('./routes/userCode')(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT);

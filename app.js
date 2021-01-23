const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./services/passport');
const errorHandler = require('./helpers/errorHandler');
const authConfig = require('./helpers/authConfig');
const useChat = require('./services/chat');
require('dotenv').config();
const router = require('./routes/index');

const app = express();

app.use(logger('dev'));

app.use(cors());
app.use(cookieParser(authConfig.jwt.secret));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
passportConfig(passport);

app.use('/', router);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, function () {
  console.log(`Server running at ${PORT}`);
});

// provide a map to keep track of online users
useChat(server, new Map());

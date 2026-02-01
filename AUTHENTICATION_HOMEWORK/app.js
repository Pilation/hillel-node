import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import fs from 'fs';
import logger from 'morgan';
import dotenv from 'dotenv';
import { authRouter, pagesRouter } from './routers/index.js';

dotenv.config();

const SessionFileStore = FileStore(session);

if (!fs.existsSync('./sessions')) {
    fs.mkdir('./sessions');
}

const PORT = process.env.PORT || 3800;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(logger('dev'));

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized : false,
    cookie : {secure : false},
    store : new SessionFileStore({
        path: './sessions',
        ttl : 60*60,
        retries : 1,
        logFn:  ()=> {},
        reapAsync :false
    })
}));

app.use((req, res, next)=> {
    if (req.session.username) {
        res.locals.username = req.session.username;
        res.locals.email = req.session.email;
        res.locals.role = req.session.role;
    }
    res.locals.currentPage = req.path;
    next();
});

app.use('/', authRouter);
app.use('/', pagesRouter);

app.listen(PORT, () => {
  console.log(`Server start на http://localhost:${PORT}`);
});
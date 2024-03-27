import express from 'express';
import bodyParser from "body-parser";
import {authHandler, authRouter} from "./auth.js";
import {notesHandler } from './notes.js';
import {basse} from "./users.js";
import {users} from './users.js';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json())
basse(app);
authRouter(app);
notesHandler(app);
basse(app);

app.use('/', (req, res)=> {
    res.render('main')
    const user =users.filter((item)=>item.login==req.query.login && item.password==req.query.password)
    console.log(user)
 
});



app.get('/message', authHandler, (req, res) => {
    res.json({
        message: "Hello, world",
    })
})

app.listen(
    5050,
    () => console.log('Server started')
);
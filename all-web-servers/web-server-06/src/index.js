import express from 'express';
import bodyParser from "body-parser";
import {authHandler, authRouter} from "./auth.js";
import {notesHandler } from './notes.js';
import {basse} from "./users.js";




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json())
basse(app);
authRouter(app);
notesHandler(app);
basse(app);

app.get('/message', authHandler, (req, res) => {
    res.json("hello world")
})

app.use('/', (req, res)=> {
    var q=['/','/profil'];
    res.render('main')
});


app.listen(
    5050,
    () => console.log('Server started')
);
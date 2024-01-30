import express from 'express';
import bodyParser from "body-parser";
import {authHandler, authRouter} from "./auth.js";
import {notesHandler } from './notes.js';
import {chatExamplee} from "./chats.js"; 
const app = express();

app.use(bodyParser.json());

authRouter(app);
notesHandler(app);
chatExamplee(app);

app.get('/message', authHandler, (req, res) => {
    res.json({
        message: "Hello, world",
    })
})

app.listen(
    5050,
    () => console.log('Server started')
);
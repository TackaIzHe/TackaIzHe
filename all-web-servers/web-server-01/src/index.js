import express from 'express'; 
import bodyParser from 'body-parser'; 
 
import {usersRouter} from './users.js'; 
 
const app = express(); 
app.use(bodyParser.json()); 
usersRouter(app); 
app.listen(5050, () => console.log('Start server'))
import express from "express";
import bodyParser from "body-parser";

import {groupsRouter} from "./groups.js";

const app = express();
app.use(bodyParser.json());
groupsRouter(app);
app.listen(5050, () => console.log("server start"));
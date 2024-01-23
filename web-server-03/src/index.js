import express from "express";
import bodyParser from "body-parser";

import {authModule} from "./reg.js";

const app = express();
app.use(bodyParser.json());
authModule(app);
app.listen(5000, () => console.log("server start"));
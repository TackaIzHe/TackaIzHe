import {v4} from 'uuid';
import {users} from './users.js'
// const users = [
//     {
//         id: 1,
//         firstName: "Nikita",
//         secondName: "Sitnik",
//         username: "whywelive", // WhyWeLive
//         password: "123456"
//     }
// ];

const tokens = [];

export const authHandler = (req, res, next) => {
    const authorization = req.query.hesh;

    if (!authorization) {
        return res.status(401).json({
            error: "Bad credentials (empty)"
        })
    }

    const token = authorization;
    const type='Bearer';
    if (type !== 'Bearer') {
        return res.status(401).json({
            error: "Bad credentials (type)"
        })
    }

    const session = tokens.find((item) => item.token === token);

    if (!session) {
        return res.status(401).json({
            error: "Bad credentials (not found)"
        })
    }
    
    req.locals = {};
    req.locals.user = users
        .find((user) => user.id === session.userId);
    
    next();
};

export const authRouter = (app) => {
    app.get('/auth/tokens', (req, res) => {
       res.json(tokens);
    });

  app.get('/auth/login', (req, res) => {
     const {login, password} = req.query;

     if (!login || !password) {
         return res.status(400).json({
             error: "username or password is empty"
         })
     }

     const user = users.find(
         (user) =>
             user.login.toLowerCase() === login.toLowerCase()
             && user.password === password
     );

     if (!user) {
         return res.status(401).json({
             error: "bad credentials"
         })
     }

     const token = v4();

     tokens.push({
         userId: user.id,
         token,
     })

     res.json({
         token,
         firstName: user.firstName,
         secondName: user.secondName,
     })
  });
};
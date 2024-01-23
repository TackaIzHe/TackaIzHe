
import {v4} from 'uuid';

const users = [
    {
        id: 1,
        firstName: "Nikita",
        secondName: "Sitnik",
        username: "whywelive", // WhyWeLive
        password: "123456"
    }
];

const tokens = [];

export const authHandler = (req, res, next) => {
    const authorization = req.header('authorization');

    if (!authorization) {
        return res.status(401).json({
            error: "Bad credentials (empty)"
        })
    }

    const [type, token] = authorization.split(" ");

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

  app.post('/auth/login', (req, res) => {
     const {username, password} = req.body;

     if (!username || !password) {
         return res.status(400).json({
             error: "username or password is empty"
         })
     }

     const user = users.find(
         (user) =>
             user.username.toLowerCase() === username.toLowerCase()
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
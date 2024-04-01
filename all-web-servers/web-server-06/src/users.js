export { users };
import { authHandler, tokens } from "./auth.js";
var users = [];
export const basse = (app) => {
  let id = 1;
  var messagesUser = [];
  var messagesCom = [];

  users[0] = {
    id: 0,
    firstName: "vitalia",
    secondName: "mikhailov",
    login: 'vitalia',
    password: 'mik'
  }

  app.use("/register", (req, res) => {
    res.render("reg")
    const user = {
      id: id++,
      firstName: req.query.firstname,
      secondName: req.query.secondname,
      login: req.query.login,
      password: req.query.password
    }
    const user1 = users.filter((item) => item.login === user.login && item.password === user.password)
    if (!user.login || !user.password) { return; }
    if (user1.length >= 1) { return; }

    users.push(user);

  });


  app.use('/profil', authHandler, (req, res) => {
    const id1 = tokens.filter((item) => item.token == req.query.hesh)
    const userName1 = users.filter((item) => item.id == id1[0].userId)
    res.render('prof', {
      messages: messagesUser
    })
    const Com = {
      id: id++,
      text: req.query.com
    
    }

    const message = {
      id: id++,
      name: req.query.name,
      message: req.query.message,
      userfirst: userName1[0].firstName,
      usersecond: userName1[0].secondName,
      Comment: messagesCom
    }

    if (!message.name || !message.message)
      return;
    messagesUser.push(message);
    
    console.log(Com)
    console.log(messagesUser)
    messagesUser[0].Comment.push(Com)
    console.log(messagesUser[0].Comment)
  })
  // app.use('/auth/logi',(req,res)=>{
  //   res.render('auth');
  // })

}
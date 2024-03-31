export{users};
import {authHandler, authRouter} from "./auth.js";
var users=[];
export const basse = (app) => {
  let id=1;
  var messagesUser=[];

users[0]={
  id:0,
  firstName: "vitalia",
  secondName: "mikhailov",
  login:'vitalia',
  password:'mik'
}

      app.use("/register",(req, res)=> {
        res.render("reg")
        const user={
          id:id++,
          firstName:req.query.firstname,
          secondName:req.query.secondname,
          login:req.query.login,
          password:req.query.password
        }
        const user1 = users.filter((item)=>item.login===user.login && item.password===user.password)
        if(!user.login || !user.password)
        {return;}
       if(user1.length>=1)
        {return;}

      users.push(user);

        });


      app.use('/profil',authHandler,(req,res)=>{
        res.render('prof',{
          messages:messagesUser
        })
        const message={
          id:id++,
          name:req.query.name,
          message:req.query.message
        }
        if(!message.name || !message.message)
        return;
        messagesUser.push(message);
      })
      app.use('/auth/logi',(req,res)=>{
        res.render('auth');
      })
       
      }
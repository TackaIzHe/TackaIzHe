export{users};
var users=[];
export const basse = (app) => {
  let id=0;


      app.use("/register",(req, res)=> {
        res.render("reg")
        const user={
          id:id++,
          login:req.query.login,
          password:req.query.password
        }
        if(!user.login || !user.password)
        return;
        users.push(user);
        });

      }
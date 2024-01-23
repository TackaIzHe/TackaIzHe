export const usersRouter = (app) => { 
    const v=[]; 
    let idNum=0; 
    let isAdult=false; 
    const users = []; 
 
    app.get('/users/', (req, res) => { 
        res.json(users); 
    }); 
 
    app.get("/users/:id",(req,res)=>{ 
        const id = Number(req.params.id); 
        const user = users.find(item=>item.id===id) 
        if(!user){ 
            res.status(404).json({ 
                message:"Пользователь не найден" 
            }); 
            return ; 
 
        } 
        res.json(user); 
    }) 
     
    app.post('/users/', (req, res) => { 
        const name = req.body.name; 
        const age = req.body.age; 
         
        if (!name || !age) { 
            res.status(400).json({ 
                message: "Укажите параметры name и age!" 
            }) 
             
            return; 
        } 
        if(age>=18) 
        { 
            isAdult=true; 
        } 
        else{ 
            isAdult=false; 
        } 
        app.get("/users1/", (req, res)=> { 
             
                for(let x of users) 
                { 
                    if(x.isAdult==true) 
                    { 
                        v.push(x); 
                    } 
                } 
                res.json(v) 
        }) 
         
        const user = { 
            id:idNum++,  
            name,  
            age, 
            isAdult:isAdult }; 
 
        users.push(user); 
 
        res.json(user); 
    }) 
    app.delete("/users/:id",(req,res)=>{ 
        const id =Number(req.params.id); 
        const user = users.find(user=>user.id===id); 
        if(!user) 
        { 
            res.status(404).json({ 
                message:"Пользователь не найден" 
 
            }) 
            return; 
        } 
        const index = users.indexOf(user); 
        const index1 = v.indexOf(user); 
        users.splice(index,1); 
        v.splice(index1,1) 
        return res.json(user); 
 
    }) 
};
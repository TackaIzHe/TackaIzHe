export const groupsRouter = (app) => 
{
    let idNum = 0;
    let idNumS=0;
    const groups = [];
    const students = [];

    app.get("/groups/", (req, res) => {
        res.json(groups);
    });

    app.get("/groups/:id", (req, res) =>{
        const id = Number(req.params.id);
        const group = groups.find(item=>item.id===id)

        if(!group){
            res.status(404).json({
                message:"Уч. группа не найдена"
            });
            return;
        }
        res.json(group);
    });

    app.post("/groups/", (req,res)=>{
        const group={ 
            id : idNum++,
            title : req.body.title,
            course : req.body.course,
            specialty : req.body.specialty
        }
        groups.push(group);

        res.json(group);
    });

    app.put("/groups/:id", (req,res)=>{
        const id = Number(req.params.id);
        const group = groups.find(item=>item.id===id)

        if(!group)
        {
            res.status(404).json({
                message:"Уч. группа не найдена"
            });
            return;
        }

        groups[id].title=req.body.title;
        groups[id].course=req.body.course;
        groups[id].specialty=req.body.specialty;
        const group1 = groups.find(item=>item.id===id)
        res.json(group1);
    });

    app.delete("/groups/:id", (req, res)=>{
        const id = Number(req.params.id);
        const group = groups.find(item=>item.id===id);

        if(!group)
        {
            res.status(404).json({
                message:"Уч. группа не найдена"
            });
            return;
        }
        const index = groups.indexOf(group); 
        groups.splice(index,1);  
        return res.json(group); 
    });
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
    app.post("/students/", (req,res)=>{
        const x = req.body.groupId;
        const y = groups.find(item=>item.id===x)
        if(!y)
        {
            res.status(404).json({
                message:"Уч. группа не найдена"
            }); 
        }
        const student ={
            id : idNumS++,
            firstName : req.body.firstName,
            secondName : req.body.secondName,
            age : req.body.age,
            groupId : x,
            group : y
        }
        students.push(student);
        res.json(student);
    });

    app.get("/students/",(req,res)=>{
        res.json(students);
    });

    app.get("/students/:id",(req,res)=>{
        const student = students.find(item=>item.id===Number(req.params.id));
        if(!student)
        {
            res.status(404).json({
                message:"Пользователь не найден"
            });
        }
        res.json(student);
    });

    app.put("/students/:id",(req,res)=>{
        const id = Number(req.params.id);
        const student = students.find(item=>item.id===id)
        const gId = req.body.groupId;
        if(!groups[gId])
        {
            res.status(404).json({
                message:"Уч. группа не найдена"
            });
            return;
        }
        if(!student)
        {
            res.status(404).json({
                message:"Пользователь не найден"
            });
            return;
        }
        students[id].firstName=req.body.firstName;
        students[id].secondName=req.body.secondName;
        students[id].age=req.body.age;
        students[id].groupId=req.body.groupId;
        students[id].group=groups[gId];

        res.json(students[id])
    });

    app.delete("/students/:id",(req,res)=>{
        const id = Number(req.params.id);
        const student = students.find(item=>item.id===id);

        if(!student)
        {
            res.status(404).json({
                message:"Пользователь не найден"
            });
            return;
        }
        const index = students.indexOf(student); 
        students.splice(index,1);  
        return res.json(student); 
    });
}
export const chatExamplee = (app) => {
   
    const chatss = [];
    const messages = [];
    let id = 0;
    app.post('/chats/:id', (req, res) => {
        const memberId =[];
        memberId.push(Number(req.params.id))
        const { title } = req.body;
        let chat = {
            id: id++,
            title,
            members: memberId 
        }
        chatss.push(chat);
        res.json(chat);
    });
    app.get("/chats/:id", (req, res) => {
        const id = Number(req.params.id);
        const chatsss = chatss.find(item => item.id === id)

        if (!chatsss) {
            res.status(404).json({
                message: "Уч. группа не найдена"
            });
            return;
        }
        res.json(chatsss);
    });
    app.put("/chats/:id", (req, res) => {
        const id = Number(req.params.id);
        const putt = chatss.find(item => item.id === id)

        if (!putt) {
            res.status(404).json({
                message: "Чат не найден"
            });
            return;
        }

        putt.title = req.body.title;
        const putt1 = chatss.find(item => item.id === id)
        res.json(putt1);
    });
    app.delete("/chats/:id", (req, res) => {
        const id = Number(req.params.id);
        const del = chatss.find(item => item.id === id);

        if (!del) {
            res.status(404).json({
                message: "Чат не найден"
            });
            return;
        }
        const index = chatss.indexOf(del);
        chatss.splice(index, 1);
        return res.json(del);
    });

    app.post('/chats/:id/members/:memberId', (req,res) => {
        const id = Number(req.params.id);
        const memberID = Number(req.params.memberId)
        const posts = chatss.find(item => item.id === id)
        posts.members.push(memberID);
        res.json(posts)
    })
    app.delete('/chats/:id/members/:memberId', (req,res) =>{
        const id = Number(req.params.id);
        const memberID = Number(req.params.memberId);
        const user = chatss[id].members;
        const userid = user.indexOf(memberID);//возвращает -1 хз почему
        if (userid!==-1)
        {
            user.splice(userid,1);
        }
        return res.json(chatss[id])
        
    })

    app.get('/chats/', (req, res) => {
        res.json(chatss)
    })
    app.post('/chats/:id/messages', (req,res)=>{
        
        let msg = {
            id:id++,
            content: req.body.content
        }
        messages.push(msg);
        res.json(msg);
    })
}
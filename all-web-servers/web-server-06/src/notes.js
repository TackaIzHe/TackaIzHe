import {authHandler} from "./auth.js";

let currentNoteId = 0;
const notes = [
    {
        id: ++currentNoteId,
        authorId: 1,
        note: "Hello, world!"
    },
    {
        id: ++currentNoteId,
        authorId: 2,
        note: "Hello, test!"
    },
    {
        id: ++currentNoteId,
        authorId: 1,
        note: "Hello, college!"
    }
];

export const notesHandler = (app) => {
    app.get('/notes/', authHandler, (req, res) => {
        const user = req.locals.user;

        res.json(
            notes.filter((note) => note.authorId === user.id)
        );
    });
    
    // GET /notes/:id
    // находит по id
    // проверяет доступ к заметке по userId
    // возвращает 
    app.get("/notes/:id",authHandler,(req,res)=>{
        const user = req.locals.user;
        const note = notes.filter((note)=> note.authorId===user.id && note.id===Number(req.params.id))
        if(note.length!=0)
        {
            res.json(note)
        }
        else
        {    
            res.json("отказано в доступе")
        }
        
    })

    app.post('/notes/', authHandler, (req, res) => {
        const user = req.locals.user;
        const {note} = req.body;

        if (!note) {
            return res.json(400).json({
                error: "note is empty"
            })
        }

        const item = {
            id: ++currentNoteId,
            authorId: user.id,
            note,
        }

        notes.push(item);

        res.json(item);
    })

    // PUT /notes/:id
    // находит по id
    // проверяет доступ к заметке по userId
    // обновляет
    // возвращает
    app.put("/notes/:id",authHandler,(req,res)=>
    {
        const user = req.locals.user;
        const note = notes.filter((note)=> note.authorId===user.id && note.id===Number(req.params.id))
        if(note.length!=0)
        {
            let q = notes.findIndex((item)=>item.id==note[0].id)
            notes[q].note=req.body.note;
            res.json(notes[q])
        }
        else
        {    
            res.json("отказано в доступе")
        }

    })

    app.delete("/notes/:id",authHandler,(req,res)=>{
        const user = req.locals.user;
        const note = notes.filter((note)=> note.authorId===user.id && note.id===Number(req.params.id));
        if(note.length!=0)
        {
            const index = notes.findIndex((item)=>item.id===note[0].id); 
            notes.splice(index,1);  
            res.json(note[0]); 
        }
        else{
            res.json("отказано в доступе")
        }
    })
    // DELETE /notes/:id
    // находит по id
    // проверяет доступ к заметке по userId
    // удаляет
    // возвращает
};
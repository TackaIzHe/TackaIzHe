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

    // DELETE /notes/:id
    // находит по id
    // проверяет доступ к заметке по userId
    // удаляет
    // возвращает
};
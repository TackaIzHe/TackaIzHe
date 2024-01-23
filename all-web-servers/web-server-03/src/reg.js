export const authModule = (app) => {
    /**
     * Последний идентификатор пользователя
     */
    let lastUserId = 0;

    /**
     * id {number}
     * firstName {string} - имя
     * secondName {string} - фамилия
     * 
     * username {string} - логин
     * password {string} - пароль
     */
    const users = [];

    app.post('/auth/register/', (req, res) => {
        const {
            firstName,
            secondName,
            username,
            password
        } = req.body;

        if (!firstName || !secondName || !username || !password) {
            return res.status(400).json({
                error: "Fields are empty"
            });
        }

        if (users.some((user) => user.username === username)) {
            return res.status(409).json({
                error: "user already registered",
            });
        }

        const user = {
            id: ++lastUserId,

            firstName,
            secondName,
            username,
            password
        };

        users.push(user);

        res.status(201).json(user);
    });

    app.post("/auth/login/", (req, res) => {
        const user ={
            username: req.body.username,
            password: req.body.password
        }
        const user1 = users.find(item=>item.username===user.username && item.password === user.password)

        const user2 = {
        firstName:user1.firstName,
        secondName:user1.secondName
        }
        if (!user1) {
            res.status(404).json({
                message: "Неверный пароль или логин."
            });
            return;
        }
        res.json(user2);
        
    });

};
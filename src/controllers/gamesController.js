import connection from "../setup/database.js";

const gamesController = {
    get: async function(req,res){
        try{
            const { rows:games } = connection.query(`
                SELECT g.*, c.name as "categoryName" 
                FROM games g 
                JOIN categories c
                ON g."categoryId" = c.id
            `)
            res.send(games)
        }catch(error){
            res.sendStatus(500);
        }
    },
    newGame: async function(req,res){
        const {name, image, stockTotal, categoryId, pricePerDay} = req.body
        try{
            await connection.query(`
                INSERT INTO games
                (name, image, "stockTotal", "categoryId", "pricePerDay")
                VALUES
                ($1, $2, $3, $4, $5)`,
                [name, image, stockTotal, categoryId, pricePerDay]
            )
            res.send(201)
        }catch(error){
            res.sendStatus(500);
        }
    },
}

export default gamesController

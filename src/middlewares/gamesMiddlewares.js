import connection from "../setup/database.js";
import gamesSchema from "../schemas/gamesSchema.js";

const gamesMiddlewares = {
    validation: function(req,res,next){
        const newGame = req.body;
        const validation =  gamesSchema.validate(newGame);
        if(validation.error){return res.sendStatus(400)};
        next();
    },
    isNew: async function(req,res,next){
        const newGame = req.body;
        const { rows:games } = await connection.query(`SELECT name FROM games WHERE name=$1`, [newGame.name]);
        if(games.length > 0){return res.sendStatus(409)};
        next();
    },
    haveCategory: async function(req,res,next){
        const categoryId = req.body.categoryId;
        const { rows:games } = await connection.query(`SELECT id FROM categories WHERE id=$1`, [categoryId]);
        if(games.length === 0){return res.sendStatus(409)};
        next();
    }
};

export default gamesMiddlewares;
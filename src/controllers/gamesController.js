import e from "express";
import connection from "../setup/database.js";

const gamesController = {
    get: async function(req,res){
        try{
            const { rows: games } = connection.query(`
                SELECT g.*, c.name as "categoryName" 
                FROM games g 
                JOIN categories c
                ON g."categoryId"=c.id
            `)
            res.send(games)
        }catch(error){
            res.sendStatus(500);
        }
    }
}

export default gamesController

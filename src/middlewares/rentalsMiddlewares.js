import connection from "../setup/database.js";
import rentalsSchema from "../schemas/rentalsSchema.js";

const rentalsMiddlewares = {
    validation: function(req,res,next){
        const newRent = req.body;
        const validation =  rentalsSchema.validate(newRent);
        if(validation.error){return res.sendStatus(400)};
        console.log('Passei pelo Schema')
        next();
    },
    haveCostumer: async function(req,res,next){
        const { customerId } = req.body;
        const { rows:customer } = await connection.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
        if(customer.length === 0){return res.sendStatus(400)};
        console.log('Passei pelo haveCostumer')
        next();
    },
    haveGame:async function(req,res,next){
        const { gameId } = req.body;
        const { rows:game } = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
        if(game.length === 0){return res.sendStatus(400)};
        res.locals.game = game
        console.log('Passei pelo haveGame')
        next();
    },
    haveRent: async function(req,res,next){
        const game  = res.locals.game[0]
        if(game.stockTotal === 0){return res.sendStatus(400)};
        console.log('Passei pelo haveRent')
        next();
    }
};

export default rentalsMiddlewares;
import connection from "../setup/database.js";
import rentalsSchema from "../schemas/rentalsSchema.js";
import dayjs from "dayjs";

const rentalsMiddlewares = {
    validation: function(req,res,next){
        const newRent = req.body;
        const validation =  rentalsSchema.validate(newRent);
        if(validation.error){return res.sendStatus(400)};
        next();
    },
    haveCostumer: async function(req,res,next){
        const { customerId } = req.body;
        try{
            const { rows:customer } = await connection.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
            if(customer.length === 0){return res.sendStatus(400)};
            next();
        }catch(error){
            res.sendStatus(500);
        };
    },
    haveGame:async function(req,res,next){
        const { gameId } = req.body;
        try{
            const { rows:game } = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
            if(game.length === 0){return res.sendStatus(400)};
            res.locals.game = game
            next();
        }catch(error){
            res.sendStatus(500);
        };
    },
    haveStock: function(res,next){
        const game  = res.locals.game[0]
        if(game.stockTotal === 0){return res.sendStatus(400)};
        next();
    },
    haveRent: async function(req,res,next){
        const { id } = req.params;
        try{
            const { rows:rent } = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
            if(rent.length === 0){return res.sendStatus(404)};
            res.locals.rent = rent;
            next()
        }catch(error){
            res.sendStatus(500);
        };
    },
    isReturned: function(res,next){
        const { returnDate } = res.locals.rent[0];
        if(returnDate !== null){return res.sendStatus(400)};
        next()
    },
    haveDelay: function(res,next){
        const { daysRented, rentDate }= res.locals.rent[0];
        const delayTime = dayjs().diff(rentDate, 'day');
        if(daysRented < delayTime){
            res.locals.delay = delayTime - daysRented;
        }
        next();
    },
    isReallyReturned: function(res,next){
        const { returnDate } = res.locals.rent[0];
        if(returnDate === null){return res.sendStatus(400)};
        next()
    }
};

export default rentalsMiddlewares;
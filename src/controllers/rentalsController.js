import connection from "../setup/database.js";
import dayjs from 'dayjs';

const rentalsController = {
    get: async function(req,res){
        const query  = req.query;
        const { queryString } = res.locals;
        const { queryValues } = res.locals;
        let joinQuery = `
        SELECT r.*,
        jsonb_build_object(
            'id', c.id,
            'name', c.name
        ) as customer,
        jsonb_build_object(
            'id', g.id,
            'name', g.name,
            'categoryId', g."categoryId",
            'categoryName', categories.name
        ) as game
        FROM rentals r
        JOIN customers c
        ON r."customerId"= c.id
        JOIN games g
        ON r."gameId" = g.id
        JOIN categories
        ON g."categoryId" = categories.id`;

        try{
            if(queryString.length > 0){
                joinQuery += queryString
            }

            const { rows:allRentals } = await connection.query(joinQuery, queryValues);
            res.send(allRentals);
        }catch(error){
            res.sendStatus(500);
        }
    },
    postRent: async function(req,res){
        const { customerId, gameId, daysRented } = req.body;
        const { pricePerDay } = res.locals.game[0];
        try{
            await connection.query(`
            INSERT INTO rentals
            ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
            `, [Math.floor(customerId), Math.floor(gameId), dayjs().format('YYYY-MM-DD'), Math.floor(daysRented), null, Math.floor(gameId * pricePerDay), null]
            );
    
            res.sendStatus(201);
        }catch(error){
            res.sendStatus(500);
        }
    },
    finishRent: async function(req,res){
        const { customerId, gameId, rentDate, daysRented, originalPrice } = res.locals.rent[0];
        const { delay } = res.locals;
        const { id } = req.params;
        let mult = null;
        try{
            if(delay !== undefined){
                mult = delay
            };
    
            await connection.query(`
            UPDATE rentals
            SET "customerId"=$1, "gameId"=$2, "rentDate"=$3, "daysRented"=$4, "returnDate"=$5, "originalPrice"=$6, "delayFee"=$7
            WHERE id=$8
            `, [Math.floor(customerId), Math.floor(gameId), rentDate, Math.floor(daysRented), dayjs().format('YYYY-MM-DD'), originalPrice, mult, id]
            );
        }catch(error){
            res.sendStatus(500);
        }
        res.sendStatus(201);
    },
    delete: async function(req,res){
        const { id } = req.params;
        try{
            await connection.query(`DELETE FROM rentals WHERE id=$1`, [id]);

            res.sendStatus(200);
        }catch(error){
            res.sendStatus(500);
        };
    }
}

export default rentalsController

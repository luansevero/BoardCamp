import connection from "../setup/database.js";
import dayjs from 'dayjs';

const rentalsController = {
    get: async function(req,res){
        try{
            const { rows:allRentals } = await connection.query(`
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
            ON "customerId"= c.id
            JOIN games g
            ON "gameId" = g.id
            JOIN categories
            ON g."categoryId" = categories.id
            `)
            res.send(allRentals)
        }catch(error){
            res.sendStatus(500);
        }
    },
    postRent: async function(req,res){
        const { customerId, gameId, daysRented } = req.body;
        const { pricePerDay } = res.locals.game[0]

        await connection.query(`
        INSERT INTO rentals
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        `, [Math.floor(customerId), Math.floor(gameId), dayjs().format('YYYY-MM-DD'), Math.floor(daysRented), null, Math.floor(gameId * pricePerDay), null]
        )

        res.sendStatus(201);
    }
}
/* 

*/
export default rentalsController

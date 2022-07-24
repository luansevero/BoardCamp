import connection from "../setup/database.js";

const rentalsController = {
    get: async function(req,res){

            const { rows:rentals } = await connection.query(`
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
            res.send(rentals)

    },
}

export default rentalsController

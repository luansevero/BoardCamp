import connection from "../setup/database.js";

const customersMiddleware = {
    haveId: async function(req,res,next){
        const { id } = req.params;
        try{
            const customer = await connection.query(`
            SELECT * FROM customers
            WHERE id=$1
            `, [id]
            );

            if(customer.length === 0){return res.sendStatus(404)};
            req.locals.customer = customer;
            next()
        }catch(error){
            res.sendStatus(500)
        };
    }
};

export default customersMiddleware;
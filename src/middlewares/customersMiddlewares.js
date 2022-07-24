import connection from "../setup/database.js";
import customersSchema from "../schemas/customersSchema.js";

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
    },
    validate: function(req,res,next){
        const newCustomer = req.body;
        const validation =  customersSchema.validate(newCustomer);
        if(validation.error){return res.send(validation.error)};
        next();
    },
    isNew: async function(req,res,next){
        const  cpf  = req.body.cpf;
        const { rows:customer } = await connection.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
        if(customer.length > 0){return res.sendStatus(409)};
        next();
    }
};

export default customersMiddleware;
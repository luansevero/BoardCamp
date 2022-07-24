import connection from "../setup/database.js";

const customerController = {
    get: async function(req,res){
        const { cpf } = req.query;
        try{
            if(cpf !== undefined){
                const {rows:customers} = await connection.query(`
                SELECT * FROM customers 
                WHERE cpf 
                LIKE $1
                `, [`${cpf}%`]
                );
                res.send(customers)
            } else {
                const {rows:customers} =  await connection.query(`SELECT * FROM customers`);
                res.send(customers)
            }    
        }catch(error){
            res.sendStatus(500);
        }
    },
    getById: async function(req,res){
        const { customer } = req.locals;
        try{
            res.send(customer)
        }catch(error){
            res.sendStatus(500);
        }
    }
}

export default customerController

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
        const { customer } = res.locals;
        try{
            res.send(customer)
        }catch(error){
            res.sendStatus(500);
        }
    },
    newCustomer: async function(req,res){
        const {name, phone, cpf, birthday} = req.body;
        try{
            await connection.query(`
                INSERT INTO customers
                (name, phone, cpf, birthday)
                VALUES
                ($1, $2, $3, $4)
            `, [name, phone, cpf, birthday]
            )
            res.sendStatus(201)
        }catch(error){
            res.sendStatus(500);
        }
    },
    changeInfos: async function(req,res){
        const {name, phone, cpf, birthday} = req.body;
        const { id } = req.params;
        try{
            await connection.query(`
                UPDATE customers
                SET name=$1, phone=$2, cpf=$3, birthday=$4
                WHERE id=$5
            `, [name, phone, cpf, birthday, id]
            )
            res.sendStatus(201)
        }catch(error){
            res.sendStatus(500);
        }
    }
}

export default customerController

import connection from "../setup/database.js";

const customerController = {
    get: async function(req,res){
        const { cpf } = req.query;
        const { queryString } = res.locals;
        const { queryValues } = res.locals;
        let customerQuery = `SELECT * FROM customers`;
        try{
            if(cpf !== undefined){
                customerQuery += ` WHERE cpf LIKE '${cpf}%'`;
            }
            if(queryString.length > 0){
                customerQuery += queryString
            }
            console.log(customerQuery)
            console.log(queryValues)
            const {rows:customers} =  await connection.query(customerQuery,queryValues);
            res.send(customers)   
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

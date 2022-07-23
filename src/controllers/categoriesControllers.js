import connection from "../setup/database.js";

const categoriesController = {
    get: async function(req,res){
        try{
            const { rows:allCategories } = await connection.query(`SELECT * FROM categories`);

            res.send(allCategories)
        }catch(error){
            res.sendStatus(500);
        }
    }
}


export default categoriesController
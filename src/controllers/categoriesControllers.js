import connection from "../setup/database.js";

const categoriesController = {
    get: async function(req,res){
        try{
            const { rows:allCategories } = await connection.query(`SELECT * FROM categories`);

            res.send(allCategories)
        }catch(error){
            res.sendStatus(500);
        }
    },
    newPost: async function(req,res){
        const newCategorie = req.body;
        try{
            await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [newCategorie.name]);

            res.sendStatus(201);
        }catch(error){
            res.sendStatus(500);
        }
    }
}


export default categoriesController;
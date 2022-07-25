import connection from "../setup/database.js";

const categoriesController = {
    get: async function(req,res){
        const query = req.query;
        let allCategoriesQuery = `SELECT * FROM categories`;

        try{
            if(query.limit !== undefined){
                allCategoriesQuery += ` LIMIT ${query.limit}`
            }
            if(query.offset !== undefined){
                allCategoriesQuery += ` OFFSET ${query.offset}`
            }
            const { rows:allCategories } = await connection.query(allCategoriesQuery);

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
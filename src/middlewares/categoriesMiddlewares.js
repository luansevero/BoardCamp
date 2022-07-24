import connection from "../setup/database.js";
import categoriesSchema from "../schemas/categoriesSchema.js";

const categoriesMiddleware = {
    validation: function(req,res,next){
        const newCategorie = req.body;
        const validation =  categoriesSchema.validate(newCategorie);
        if(validation.error){return res.sendStatus(400)};
        next();
    },
    isNew: async function(req,res,next){
        const newCategorie = req.body;
        const { rows:categorie } = await connection.query(`SELECT name FROM categories WHERE name=$1`, [newCategorie.name]);
        if(categorie.length > 0){return res.sendStatus(409)};
        next();
    }
};

export default categoriesMiddleware;
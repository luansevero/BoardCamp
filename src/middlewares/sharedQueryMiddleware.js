import connection from "../setup/database.js";

const sharedQueryMiddlewares = {
    removeInvalidQuery: function(req,res,next){
        const query = {...req.query};
        const auxQuery = Object.keys(query);
        const queryTypes = ['order', 'limit', 'offset']
        for(let i = 0; i < auxQuery.length; i++){
            const queryString = auxQuery[i];
            let aux = 0;
            for(let k = 0; k < queryTypes.length; k++){
                if(queryTypes[k] !== queryString){
                    aux ++;
                } 
            }
            if(aux === queryTypes.length){
                delete query[queryString]
                auxQuery.splice(i, 1)
                i--
            }

        }
        res.locals.query = query;
        res.locals.auxQuery = auxQuery;
        next();
    },
    addQueryString: function(req,res,next){
        let queryString = ``
        const { auxQuery } = res.locals;
        const { query } = res.locals;
        const queryValues = [];
        let containDesc;
        if(auxQuery.includes('desc')){
            auxQuery.splice(auxQuery.indexOf('desc'));
            containDesc = true
        }
        if(query.order !== undefined){
            queryString += ` ORDER BY $${auxQuery.indexOf('order') + 1}`
            queryValues.splice(auxQuery.indexOf('order'), 0,query.order)
        }
        if(containDesc){
            queryString += ` DESC`
        }
        if(query.limit !== undefined){
            queryString += ` LIMIT $${auxQuery.indexOf('limit') + 1}`
            queryValues.splice(auxQuery.indexOf('limit'), 0,query.limit)
        }
        if(query.offset !== undefined){
            queryString += ` OFFSET $${auxQuery.indexOf('offset') + 1}`
            queryValues.splice(auxQuery.indexOf('offset'), 0,query.offset)
        }

        res.locals.queryValues = queryValues;
        res.locals.queryString = queryString;

        next();
    }

};

export default sharedQueryMiddlewares;
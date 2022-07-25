const sharedQueryMiddlewares = {
    removeInvalidQuery: function(req,res,next){
        const query = {...req.query};
        const auxQuery = Object.keys(query);
        const queryTypes = ['limit', 'offset']
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
    addOrdenation: function(req,res,next){
        const querys = req.query;
        let { queryString } = res.locals;

        if(querys.order !== undefined){
            queryString += ` ORDER BY ${querys.order}`
        }
        if(querys.desc !== undefined && querys.desc === 'true'){
            queryString += ` DESC`
        }

        res.locals.queryString = queryString;
        next();
    },
    addPagination: function(req,res,next){
        let { queryString } = res.locals;
        let { queryValues } = res.locals;
        const { auxQuery } = res.locals;
        const { query } = res.locals;

        const index = (queryS) => {auxQuery.indexOf(queryS)}

        if(query.limit){
            queryString += ` LIMIT $${index('limit') + 1}`
            queryValues.splice(index('limit'), 0, query.limit)
        }
        if(query.offset){
            queryString += ` OFFSET $${index('offset') + 1}`
            queryValues.splice(index('offset'), 0, query.offset)
        }
        res.locals.queryValues = queryValues;
        res.locals.queryString = queryString;
        next();
    },


};

export default sharedQueryMiddlewares;
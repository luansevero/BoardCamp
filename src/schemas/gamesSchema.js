import joi from 'joi';

const gamesSchema = joi.object({
    name: joi.string().min(1).required(),
    image: joi.string().pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/).required(),
    stockTotal: joi.number().min(1).required(),
    categoryId: joi.number().min(0).required(),
    pricePerDay: joi.number().min(1).required(),
})

export default gamesSchema
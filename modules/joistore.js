const Joi = require('joi');
function validstoreitems(dataitems ){
    
   
const schema = Joi.object({
    date: Joi.string()
      ,

      transaction:Joi.string(),
      from:Joi.string(),
      to:Joi.string(),
      contractor:Joi.string(),
      items:Joi.string(),
      type:Joi.string(),
      quantity:Joi.string().required(),
      tasks:Joi.string().allow(null).allow('').optional(),
      details:Joi.string().allow(null).allow('').optional(),

    })
  

return schema.validate(dataitems);}



module.exports.validstoreitems=validstoreitems
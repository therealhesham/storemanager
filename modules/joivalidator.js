const Joi = require('joi');
function valid(dataengineer ){
    

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        idnumber:Joi.string()
        .min(14)
        .max(14)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        repeatpassword: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birthdate: Joi.string(),
    
    address: Joi.string(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
 
    
    .with('password', 'repeatpassword');
 
    

return schema.validate(dataengineer);}
// -> { value: { username: 'abc', birth_year: 1994 } }


module.exports.valid=valid
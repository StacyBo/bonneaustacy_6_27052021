const passwordValidator = require('password-validator');

// Creation du schema de validation du mot de passe
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    
.is().max(100)                                  
.has().uppercase()                             
.has().lowercase()                              
.has().digits()                                
.has().not().spaces()        
                   
module.exports = passwordSchema
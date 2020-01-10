const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateEmail = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

/*  Epeksigisi regex gia to email: 
    ^\w+ --> Ksekinaei me opoiodipote gramma h arithmo kai sunexizei me opoidipote gramma h arithmo
    ([\.-]?\w+)* --> H teleia, h paula parousiazontai mia h kamia fora enw meta apo authn
                     mporei na parousiastoun grammata h arithmoi kamia h kai perissoteres fores

    @\w+ --> at character pou einai xarakthristiko tou email kai sunexisi me opoidipote gramma h arithmo

    (\.\w{2,3})+$ --> Escape character gia thn teleia sunexeia me opoiodipote gramma me length 
                      2 h kai 3 (p.x. gr,com,me), kai $ gia to telos tou regex me autes tis katalikseis
*/

const validatePhone = (phones) => {
    let regex = /^[\+]?[(]?[3][0][)]?[\s\.]?[0-9]{10}$|^[0-9]{10}$/;
    let result = true;

    if(phones === null)
        return true

    phones.forEach(phone => {
        result = result && regex.test(phone)
    });

    return result;
}

/* To parapanw regex kaliptei ton eksis typo ellinikwn tilefwnwn:
    +306912345678
    +30 6912345678
    +(30)6912345678
    +(30) 6912345678
    6912345678
*/

const contactSchema = new Schema({
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, validate: [validateEmail, 'Invalid email'] },
    address: { type: String, trim: true },
    phones: {type: Array, trim: true, validate: [validatePhone, 'Invalid Phone']} 
    // Ypotithemeno senario, gia aitiologhsh mh kalupshs unique pediou sto phones antikeimeno:
    // -- Exoume user A kai user B. O xrhsths A grafei to noumero tou lanthasmena. 
    // -- Ean to lanthasmeno auto noumero einai to noumero to xrhsth B tote tha vrethei dublicate key
    // -- kai o xrhsths B den tha mporesei na valei to noumero tou sthn efarmogh. 
    // -- Ara aperripsa thn idea na valw unique key sta tilefwna.
},
{
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
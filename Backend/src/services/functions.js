//Miscellaneous Functions

const crypto = require('crypto');

const generateUniqueId = (id_type)=> {
    const id = crypto.randomUUID();
    return id_type+'_'+id;
}

const capitalizeFirstLetter = (data)=> {
    data=data.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    return data;
}

module.exports = {
    generateUniqueId,
    capitalizeFirstLetter
}
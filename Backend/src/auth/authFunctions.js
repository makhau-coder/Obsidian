const bcrypt = require('bcrypt');

const hashPassword = async (pass) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        return hashedPassword;
    }
    catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const comparePassword = async (pass, hashedPass) => {
    try {
        const isMatch = await bcrypt.compare(pass, hashedPass);
        return isMatch;
    }
    catch(error) {
        console.error('Error comparing password:', error);
        throw error;
    }
}

module.exports = {
    hashPassword,
    comparePassword
}
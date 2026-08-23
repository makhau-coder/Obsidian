const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^\+?\d{10,15}$/;

const pincodeRegex = /^[1-9]\d{5}$/;

module.exports={
    emailRegex,
    phoneRegex,
    pincodeRegex
}
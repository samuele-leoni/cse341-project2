const bcrypt = require('bcrypt');

const saltRounds = 10;

const encrypt = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject('Error encrypting password');
            }
            resolve(hash);
        });
    });
}

const compare = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                reject('Error comparing password');
            }
            resolve(result);
        });
    });
}

module.exports = {
    encrypt,
    compare
}
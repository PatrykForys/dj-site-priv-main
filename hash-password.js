const bcrypt = require('bcryptjs');

const password = 'adminnn';

bcrypt.hash(password, 10).then(hash => {
    console.log('Zahashowane hasło:', hash);
}); 


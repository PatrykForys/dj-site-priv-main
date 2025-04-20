const bcrypt = require('bcryptjs');

const password = 'admin1';

bcrypt.hash(password, 10).then(hash => {
    console.log('Zahashowane hasło:', hash);
}); 
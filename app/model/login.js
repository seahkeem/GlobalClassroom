const pool = require('./db'); // Import the opened pool
const bcrypt = require('bcrypt')

const loginModel = function(username, password, callback) {
    
    // Query for the username, does it exist
    pool.query('SELECT * FROM profile WHERE profile_email = $1', [username], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            callback({ success: false, message: 'Internal Server Error' });
            return;
        }
        if (result.rows.length === 0) {
            callback({ success: false, message: 'User not found' });
            return;
        }
        
        // Store the found user with the name
        const user = result.rows[0];
         
        // Compare the password entered with the password of the found user
        bcrypt.compare(password, user.profile_password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing password:', err);
                callback({ success: false, message: 'Login error' });
                return;
            }
            if (isMatch) {
                callback({ success: true, message: 'Login successful', user});
            } else {
                callback({ success: false, message: 'Invalid password' });
            }
        });

    }); 
};

module.exports = loginModel;

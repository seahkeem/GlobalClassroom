const pool = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Validation function
function validateUserData(username, email, password) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(username)) {
        return { valid: false, message: "Invalid username" };
    }
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Invalid email address" };
    }
    if (!passwordRegex.test(password)) {
        return { valid: false, message: "Invalid password format" };
    }

    return { valid: true };
}

// Sign up function, validates user information against database and creates a new user
async function signupModel(username, email, password, callback) {

    try {
        // Validate user data before database queries
        const validation = validateUserData(username, email, password);

        if (!validation.valid)
            return callback({ success: false, message: validation.message});

        // Check if the username or email already exists
        const existingUserQuery = 'SELECT 1 FROM profile WHERE profile_username = $1';
        const existingEmailQuery = 'SELECT 1 FROM profile WHERE profile_email = $1';
        const existingEmailResult = await pool.query(existingEmailQuery, [email]);
        const existingUserResult = await pool.query(existingUserQuery, [username]);

        if (existingUserResult.rows.length > 0)
            return callback({ success: false, message: "Username already exists" });

        if (existingEmailResult.rows.length > 0) 
            return callback({ success: false, message: "Email already exists" });
        
        // Hash the password and insert the new user
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insertUserQuery = 'INSERT INTO profile(profile_username, profile_email, profile_password) VALUES($1, $2, $3) RETURNING *';
        const newUser = await pool.query(insertUserQuery, [username, email, hashedPassword]);

        // If user was succesfully added, report back result, otherwise, registration failed
        // If user was successfully added, report back result, otherwise, registration failed
        if (newUser.rows.length > 0) {
            return callback({ success: true, username: username, message: "Signup successful" });
        } else {
            return callback({ success: false, message: "Registration failed" });
        }
    } catch (error) { // Catch all error
        console.error('Error during registration:', error);
        return callback({ success: false, message: "Internal Server Error" });
    } 
}

module.exports = signupModel;

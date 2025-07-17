// sql query for creating cv into the database
const { Pool } = require('pg'); // PostgreSQL client library

// sql query for creating cv into the database
const cvModel = function(cvData, profileEmail, response) {
    console.log('Profile email from JWT token:', profileEmail); // Log profile email obtained from JWT token
    console.log('Request body:', cvData); // Log the request body to verify data received

    // Check if profileEmail is undefined
    if (!profileEmail) {
        console.error('Profile email is undefined');
        return response({ success: false, message: 'Profile email is undefined' });
    }

    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'Sp00ky!',
        port: 54321
    });

    pool.connect((err, client, release) => {
        if (err) {
            console.error('Error connecting to database:', err);
            release();
            return response({ success: false, message: 'Database connection error' });
        }

        console.log('Connected to database');

        const { page1, page2, page3, page4 } = cvData; // Destructure cvData object

        // Extract data from each page
        const {
            cv_firstname,
            cv_lastname,
            cv_phonenumber,
            cv_email,
            cv_country
        } = page1;
        const { cv_colour } = page2;
        const { cv_mbti, cv_about } = page3;
        const { cv_video } = page4;

        // Prepare data for insertion
        const data = [
            cv_firstname,
            cv_lastname,
            cv_phonenumber,
            cv_email,
            cv_country, // Assuming cv_country is an object with name and code properties
            cv_colour,
            cv_mbti,
            cv_about,
            cv_video,
            profileEmail // Pass profile_email to the query
        ];

        // Execute the INSERT query
        client.query(
            'INSERT INTO create_cv(cv_firstname, cv_lastname, cv_phonenumber, cv_email, cv_country, cv_colour, cv_mbti, cv_about, cv_video, profile_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            data,
            (err, result) => {
                release();

                if (err) {
                    console.error('Error executing INSERT query:', err);
                    return response({ success: false, message: 'CV creation failed' });
                }

                if (result.rows.length === 0) {
                    console.error('No rows returned after INSERT');
                    return response({ success: false, message: 'CV creation failed' });
                }

                console.log('CV created successfully');
                response({ success: true, message: 'CV creation successful', data: result.rows[0] });
            }
        );
    });
};

module.exports = cvModel;

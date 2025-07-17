// addpost.js
const { Pool } = require('pg');

const addPostModel = function(jobPostData, profileEmail, response) {
    console.log('Profile email from JWT token:', profileEmail); 
    console.log('Request body:', jobPostData);

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
            return response({ success: false, message: 'Add post failed' });
        }

        console.log('Connected to database');

        client.query('INSERT INTO job_post (job_post_title, job_post_category, job_post_date, job_post_description, job_post_image, profile_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING job_post_date',
        [
            jobPostData.job_post_title,
            jobPostData.job_post_category,
            jobPostData.job_post_date,
            jobPostData.job_post_description,
            jobPostData.job_post_image,
            profileEmail
        ],
        (err, result) => {
            if (err) {
                release();
                console.error('Error executing INSERT query:', err);
                return response({ success: false, message: 'Failed to add post. Please try again.' });
            }
            
            console.log('Add post successfully');

            // Release the client connection
            release();
            response({ success: true, message: 'Add post successful' });
        });
    });
};

module.exports = addPostModel;

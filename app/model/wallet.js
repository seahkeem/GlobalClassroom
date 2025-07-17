const { Pool } = require('pg');

const walletModel = function(wallet_title, response) {
    console.log('Request body:', wallet_title);

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
            return response({ success: false, message: 'Add wallet failed' });
        }

        console.log('Connected to database');

        client.query('INSERT INTO wallet (wallet_title ) VALUES ($1) RETURNING *',
        [
            wallet_title // Use walletData.name instead of walletData.wallet_title
        ],
        (err, result) => {
            release();
            if (err) {
                console.error('Error executing INSERT query:', err);
                return response({ success: false, message: 'Failed to add wallet. Please try again.' });
            }
            
            console.log('Wallet added successfully');
            response({ success: true, message: 'Wallet added successfully', data: result.rows[0] }); 
        });
    });
};

module.exports = walletModel;

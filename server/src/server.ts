import dotenv from 'dotenv';
import https from 'https';

// We must load the '.env.*' config before importing the below files because we use variables from it
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

/* eslint-disable import/first */
import app from './app';
import './utils/services/sequelize';
/* eslint-enable import/first */

const PORT = parseInt(process.env.PORT as string, 10) || 8000;

const server = https.createServer({
    cert: process.env.SSL_CERT,
    key: process.env.SSL_KEY,
}, app);

const startServer = async () => {
    server.listen(PORT, () => {
        console.log(`Listening to port ${PORT}...`);
    });
};

startServer();

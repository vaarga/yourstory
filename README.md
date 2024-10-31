# yourstory

> **Note**: This project was developed as the final project for my Bachelor's degree with a specialization in Computer 
> Science at the University of Oradea.

## Description
**yourstory** is a free blogging platform that allows users to:
- Create up to 10 stories
- Upload and edit up to 3 images per story
- Explore and "heart" other users' stories
- Switch to "anonymous author" mode
- Choose a preferred theme (light or dark)

## How to Run

To run this project, you’ll need an `.env.development` or `.env.production` file (depending on the environment) placed 
at the root of the `server` folder. Each `.env` file should contain the following variables:

```
ENVIRONMENT= # "development" or "production"
PORT= # Port number for server
COOKIE_SESSION_KEY= # Secret key for cookie session
USER_ID_ENCRYPTION_KEY= # 256-bit encryption key for user IDs
SSO_GOOGLE_CLIENT_ID= # Google client ID
SSO_GOOGLE_CLIENT_SECRET= # Google client secret
MYSQL_HOST= # MySQL host
MYSQL_PORT= # MySQL port
MYSQL_USER= # MySQL user
MYSQL_PASSWORD= # MySQL password
MYSQL_DATABASE= # MySQL database name
AWS_BUCKET_NAME= # AWS bucket name
AWS_BUCKET_REGION= # AWS bucket region
AWS_ACCESS_KEY= # AWS access key
AWS_SECRET_KEY= # AWS secret key
SSL_CERT= # SSL certificate path
SSL_KEY= # SSL private key path
```

> **Note**: The MySQL tables are generated automatically on project startup, but you must manually create the database 
> beforehand. The database name should match the `MYSQL_DATABASE` variable in your `.env` file.

### Optional: Adding a Favicon
To include a custom favicon:
1. Create an `images` folder at the root of your AWS bucket.
2. Upload your favicon as `favicon.ico` with the MIME type `image/x-icon`.

## Scripts to Run

Once you’ve created the `.env` file and configured the database, navigate to the project’s root folder and run the 
following scripts:

### Development
- `npm run install-all-development`
- `npm run build-all-development`
- `npm run start-development`

### Production
- `npm run install-all-production`
- `npm run build-all-production`
- `npm run start-production`

### For Continuous Development
If you’re making frequent changes to the code, use one of the following scripts for automatic rebuilding:

- `npm run watch-client` – for client-side code
- `npm run watch-server` – for server-side code
- `npm run watch-all` – for both client and server

**Author**: Erik Zsolt Varga

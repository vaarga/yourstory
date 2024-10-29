import express from 'express';
import cookieSession from 'cookie-session';
import path from 'path';
import helmet from './utils/middlewares/helmet';
import { ONE_DAY } from './constants/time';
import passport from './utils/middlewares/passport';
import { API_PATH_SEGMENT } from './constants/url';
import api from './routes/api';
import getFavicon from './utils/getFavicon';

const app = express();

// Set security-related HTTP response headers
app.use(helmet());

// Configure session cookie
app.use(cookieSession({
    name: 'session',
    maxAge: ONE_DAY,
    keys: [process.env.COOKIE_SESSION_KEY!],
}));

// Set up the passport session
app.use(passport.initialize());

// Authenticate the session that is being sent to the server
app.use(passport.session());

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

app.use(API_PATH_SEGMENT.root, api);

app.get('/favicon.ico', getFavicon);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
});

export default app;

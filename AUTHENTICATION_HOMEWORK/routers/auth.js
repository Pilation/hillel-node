import express from 'express';
import { authenticateUser, addUser, findUserByEmail } from '../data/usersService.js';
import { ROUTES, MESSAGES, VIEW_NAMES, USER_ROLES } from '../common/constants/index.js';
import { saveSession, destroySession } from '../utilities/sessionHelpers.js';

const router = express.Router();

// GET /login
router.get(ROUTES.LOGIN, (req, res) => {
    res.render(VIEW_NAMES.LOGIN, {});
});

// POST /login
router.post(ROUTES.LOGIN, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.username = user.username;
            req.session.email = user.email;
            req.session.role = user.role;
            
            // Save session before redirect to avoid race condition
            await saveSession(req.session);
            
            res.redirect(ROUTES.HOME);
        } else {
            res.render(VIEW_NAMES.LOGIN, { error: MESSAGES.INVALID_CREDENTIALS });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.render(VIEW_NAMES.LOGIN, { error: MESSAGES.SERVER_ERROR });
    }
});

// GET /logout
router.get(ROUTES.LOGOUT, async (req, res) => {
    try {
        await destroySession(req.session);
    } catch (err) {
        console.error('Error destroy session:', err);
    }
    res.redirect(ROUTES.HOME);
});

// GET /register
router.get(ROUTES.REGISTER, (req, res) => {
    res.render(VIEW_NAMES.REGISTER, {});
});

// POST /register
router.post(ROUTES.REGISTER, async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        
        const exists = await findUserByEmail(email);
        
        if (exists) {
            res.render(VIEW_NAMES.REGISTER, { error: MESSAGES.USER_ALREADY_EXISTS });
        } else {
            const newUser = {
                username,
                email,
                password,
                role: USER_ROLES.USER
            };
            
            await addUser(newUser);
            
            res.redirect(ROUTES.LOGIN);
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.render(VIEW_NAMES.REGISTER, { error: MESSAGES.SERVER_ERROR });
    }
});

export default router;

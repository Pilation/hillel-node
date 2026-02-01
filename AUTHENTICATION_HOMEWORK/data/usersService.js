import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MESSAGES } from '../common/constants/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const USERS_FILE = join(__dirname, '../users.json');


let usersCache = null;

export async function getUsers() {
    if (!usersCache) {
        try {
            const data = await fs.readFile(USERS_FILE, 'utf-8');
            usersCache = JSON.parse(data);
        } catch (error) {
            console.error('Error reading users file:', error.message);
            throw new Error(MESSAGES.FAILED_LOAD_USERS);
        }
    }
    return usersCache;
}

export async function authenticateUser(email, password) {
    const users = await getUsers();
    return users.find(u => u.email === email && u.password === password);
}

export async function addUser(userData) {
    try {
        const users = await getUsers();
        users.push(userData);
        
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        
        usersCache = users;
        
        return userData;
    } catch (error) {
        console.error('Error adding user:', error.message);
        throw new Error(MESSAGES.FAILED_ADD_USER);
    }
}

export async function findUserByEmail(email) {
    const users = await getUsers();
    return users.find(u => u.email === email);
}

// Clear cache (for development/testing)
export function clearCache() {
    usersCache = null;
}

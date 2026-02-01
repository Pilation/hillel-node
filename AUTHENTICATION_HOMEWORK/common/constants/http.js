// HTTP status codes and messages
export const STATUS_CODES = {
    OK: 200,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const MESSAGES = {
    // Auth messages
    INVALID_CREDENTIALS: 'Invalid email or password',
    SERVER_ERROR: 'Server error. Please try again later.',
    USER_ALREADY_EXISTS: 'User with this email or username already exists',
    
    // Access control messages
    ACCESS_DENIED_ADMIN: 'Access denied. Admin role required.',
    
    // Service errors
    FAILED_LOAD_USERS: 'Failed to load users data',
    FAILED_ADD_USER: 'Failed to add user',
    
    // Page titles
    MAIN_PAGE: 'Main Page'
};

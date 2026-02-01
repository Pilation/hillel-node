// Promise wrappers for session methods
export function saveSession(session) {
    return new Promise((resolve, reject) => {
        session.save((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

export function destroySession(session) {
    return new Promise((resolve, reject) => {
        session.destroy((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

import { saveEmail, saveUser } from './user';

function registerUser(email, user) {
    saveEmail(email);
    saveUser(user);
}

export { registerUser };
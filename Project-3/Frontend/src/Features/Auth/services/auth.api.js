import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    withCredentials: true,
});

export async function login(username, password) {
    const response = await api.post('/login', { username, password });
    return response.data;
}

export async function register(username, password) {
    const response = await api.post('/register', { fullname, username, eamil, password });
    return response.data;
}
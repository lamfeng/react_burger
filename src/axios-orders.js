import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-6a525-default-rtdb.firebaseio.com/'
});

export default instance;
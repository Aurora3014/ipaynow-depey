import axios from 'axios';
import { redirect } from 'react-router-dom';

export const GetRequest = (uri) => {
    return new Promise((resolve) => {
        axios.get(uri, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                resolve({ data: response.data });
            })
            .catch((error) => {
                // resolve({ error: error.message });
                console.log('api request catch ', error);
                if (error.response.status === 403) {
                    redirect('login');
                }
            })
    });
}

export const PostRequest = (uri, data) => {
    return new Promise((resolve) => {
        axios.post(uri, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                resolve({ data: response.data });
            })
            .catch((error) => {
                // resolve({ error: error.message });
                console.log('api request catch ', error);
                if (error.response.status === 403) {
                    redirect('login');
                }
            })
    })
}

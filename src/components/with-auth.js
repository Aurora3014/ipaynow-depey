import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const WithAuth = ({children}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(()=>{
        if (!token) {
            navigate('/login');
        }
    }, [])

    return children
}

import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const uploadFile = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data && response.data.url) {
            response.data.url = response.data.url.replace(/^\/+/, ''); // Remove leading slashes
        }
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}; 
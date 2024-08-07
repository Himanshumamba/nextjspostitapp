import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2';
const BEARER_TOKEN = 'ddef247bf428a39c0cd56275e3cc37555c5695ff18c561fa2a11632f4b9e5b87';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export const fetchUsers = () => api.get('/users');
export const createUser = (userData) => api.post('/users', userData);
export const fetchUserDetails = (userId) => api.get(`/users/${userId}`);
export const fetchUserPosts = (userId) => api.get(`/users/${userId}/posts`);
export const createPost = (postData) => api.post('/posts', postData);
export const fetchPostComments = (postId) => api.get(`/posts/${postId}/comments`);
export const createComment = (postId, commentData) => api.post(`/posts/${postId}/comments`, commentData);

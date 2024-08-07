"use client"; // Add this line to mark the component as a client component

import { useState, useEffect } from 'react';
import { Box, Button, Input, Stack, Text, FormControl, FormLabel, Select, Textarea } from '@chakra-ui/react';
import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2';
const BEARER_TOKEN = 'ddef247bf428a39c0cd56275e3cc37555c5695ff18c561fa2a11632f4b9e5b87';
export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [newComment, setNewComment] = useState({ postId: '', body: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.');
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchUserDetailsAndPosts() {
      if (selectedUserId) {
        try {
          const userResponse = await axios.get(`${API_URL}/users/${selectedUserId}`, {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`
            }
          });
          setUserDetails(userResponse.data);

          const postsResponse = await axios.get(`${API_URL}/users/${selectedUserId}/posts`, {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`
            }
          });
          setPosts(postsResponse.data);
        } catch (error) {
          console.error('Error fetching user details or posts:', error);
          setError('Failed to fetch user details or posts.');
        }
      }
    }
    fetchUserDetailsAndPosts();
  }, [selectedUserId]);



  const handleCreatePost = async () => {
    setError(null);
    try {
      await axios.post(`${API_URL}/posts`, { ...newPost, user_id: selectedUserId }, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });
      setNewPost({ title: '', body: '' });
      // Refresh posts list
      const postsResponse = await axios.get(`${API_URL}/users/${selectedUserId}/posts`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
        }
      });
      setPosts(postsResponse.data);
    } catch (error) {
      console.error('Error creating post:', error.response || error.message || error);
      setError(`Failed to create post. ${error.response?.data?.message || error.message || 'Unknown error'}`);
    }
  };
  const handleCreateComment = async (postId) => {
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/comments`,
        {
          body: newComment.body,
          name: 'Himanshu',
          email: 'HimanshuTesting.email@example.com'
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      setNewComment({ postId: '', body: '' });
      // Refresh comments list for the specific post
      const postCommentsResponse = await axios.get(`${API_URL}/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
  
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, comments: postCommentsResponse.data } : post
        )
      );
    } catch (error) {
      console.error('Error creating comment:', error.response?.data || error.message || error);
      setError(`Failed to create comment. ${error.response?.data?.message || error.message || 'Unknown error'}`);
    }
  };
  

  return (
    <Box p={2}className='content-box'>
      <Stack spacing={18}>
        <Text fontSize="xl" fontWeight="bold" className="post-card-title">View User Details & Post</Text>
        {error && <Text color="red.500">{error}</Text>}
        <FormControl>
          <FormLabel>Select  User Name </FormLabel>
          <Select placeholder="Select User" pt={10} onChange={(e) => setSelectedUserId(e.target.value)}>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </Select>
        </FormControl>

        {userDetails && (
          <>
            <Box borderWidth="1px" >
              <Text fontSize="xl" fontWeight="bold" className="post-card-title">User Details</Text>
              <Text>Name: {userDetails.name}</Text>
              <Text>Email: {userDetails.email}</Text>
              <Text>Gender: {userDetails.gender}</Text>
              <Text>Status: {userDetails.status}</Text>
            </Box>

            <Text fontSize="5xl" fontWeight="bold" className="post-card-title">Posts</Text>
            {posts.map(post => (
              <Box key={post.id} borderWidth="1px" className="post-card">
            <Text className="post-card-title">{post.title}</Text>
            <Text className="post-card-body">{post.body}</Text>

                <Text fontSize="lg" fontWeight="bold"  className="comments-container">Comments</Text>
                {post.comments && post.comments.map(comment => (
                  <Box key={comment.id} borderWidth="1px" p={2} className="comment-box">

                    <Text className="comment-text">{comment.body}</Text>
                  </Box>
                ))}

                <FormControl mt={4}>
                  <FormLabel>New Comment</FormLabel>
                  <Textarea 
                    value={newComment.body} 
                    onChange={(e) => setNewComment({ ...newComment, body: e.target.value, postId: post.id })} 
                  />
                  <Button mt={2} onClick={() => handleCreateComment(post.id)}>Add Comment</Button>
                </FormControl>
              </Box>
            ))}

            <Text fontSize="xl" fontWeight="bold" className="post-card-title">Create New Post</Text>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
              <FormLabel>Body</FormLabel>
              <Textarea value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
              <Button mt={4} onClick={handleCreatePost}   className='button_submit'>Create Post</Button>
            </FormControl>
          </>
        )}

 
      </Stack>
    </Box>
  );
}

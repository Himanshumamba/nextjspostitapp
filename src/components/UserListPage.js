"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";

const API_URL = "https://gorest.co.in/public/v2";
const BEARER_TOKEN =
  "ddef247bf428a39c0cd56275e3cc37555c5695ff18c561fa2a11632f4b9e5b87";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    gender: "",
    email: "",
    status: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      }
    }
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/users`, newUser, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      console.log('User created successfully:', response.data);
      setNewUser({ name: "", gender: "", email: "", status: "" });
      const usersResponse = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message || error);
      setError(
        `Failed to create user. ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <Box p={4}>
      <Stack spacing={4} borderWidth={2} borderColor="blue.300">
        <Box
          mb={6}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="sm"
          className="custom-box"
        >
          <Text
            display="flex"
            fontSize="xl"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            p={4}
          >
            Create New User
          </Text>
          <FormControl p={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Enter your name"
              focusBorderColor="blue.500"
            />
            <FormLabel mt={4}>Email</FormLabel>
            <Input
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Enter your email"
              focusBorderColor="blue.500"
            />
            <FormLabel mt={4}>Gender</FormLabel>
            <Select
              value={newUser.gender}
              onChange={(e) =>
                setNewUser({ ...newUser, gender: e.target.value })
              }
              placeholder="Select Gender"
              focusBorderColor="blue.500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            <FormLabel mt={4}>Status</FormLabel>
            <Select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
              placeholder="Select Status"
              focusBorderColor="blue.500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <Button
              mt={6}
              colorScheme="blue"
              onClick={handleCreateUser}
              width="full"
            >
              Create User
            </Button>
          </FormControl>
        </Box>

        <Text fontSize="xl" fontWeight="bold" className="post-card-title">
          User List
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        {users.map((user) => (
          <Box key={user.id} p={4} borderWidth="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm" mb={4}>
            <Text fontWeight="bold">Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Gender: {user.gender}</Text>
            <Text>Status: {user.status}</Text>
            <Link href={`/users/${user.id}`}>
              <Button mt={2} colorScheme="blue">View Details</Button>
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

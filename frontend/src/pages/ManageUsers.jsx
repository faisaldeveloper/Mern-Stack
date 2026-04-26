import { useEffect, useState } from 'react';
import { Box, Heading, Table, Button, HStack, Text, Flex } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import { useUserStore } from '@/store/user';
import { useColorModeValue } from '@/components/ui/color-mode';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const token = useUserStore((state) => state.token);
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    let isMounted = true;

    fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        if (isMounted && data.success) setUsers(data.data);
      })
      .catch(err => {
        if (isMounted) {
          toaster.create({
            title: "Error",
            description: err.message || "Error fetching users",
            type: "error",
          });
        }
      });

    return () => { isMounted = false; };
  }, [token]);

  const pageCount = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);
  const startNumber = users.length === 0 ? 0 : startIndex + 1;
  const endNumber = Math.min(startIndex + itemsPerPage, users.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deleteUser = (id) => {
    if (confirm("Do you want to delete this user?")) {   
      fetch(`/api/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUsers(users.filter(u => u._id !== id));
            toaster.create({
              title: "Success",
              description: "User deleted successfully",
              type: "success",
            });
          } else {
            toaster.create({
              title: "Error",
              description: data.message,
              type: "error",
            });
          }
      });
    }
  };

  const toggleRole = (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    fetch(`/api/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role: newRole })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
          toaster.create({
            title: "Success",
            description: `User role updated to ${newRole}`,
            type: "success",
          });
        } else {
          toaster.create({
            title: "Error",
            description: data.message,
            type: "error",
          });
        }
      });
  };

  return (
    <Box p={6}>
      <Flex align="center" justify="space-between" mb={6}>
        <Heading>Manage Users</Heading>
        {users.length > 0 && (
          <Text fontSize="14px" fontWeight="bold" color="blue.500">
            Showing {startNumber}–{endNumber} of {users.length}
          </Text>
        )}
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader fontWeight="bold">Name</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Email</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Role</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentUsers.map(user => (
            <Table.Row key={user._id} transition="background 0.2s" _hover={{ bg: hoverBg }}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <HStack spacing={2}>
                  <Button size="xs" colorScheme="red" variant="outline" onClick={() => deleteUser(user._id)}>
                    Delete
                  </Button>
                  <Button size="xs" colorScheme="blue" variant="solid" onClick={() => toggleRole(user._id, user.role)}>
                    {user.role === 'admin' ? 'Demote' : 'Promote'}
                  </Button>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {users.length > itemsPerPage && (
        <HStack justify="center" spacing={2} mt={6}>
          <Button
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: pageCount }, (_, index) => (
            <Button
              key={index}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
              colorScheme={currentPage === index + 1 ? 'blue' : 'gray'}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
            isDisabled={currentPage === pageCount}
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default ManageUsers;
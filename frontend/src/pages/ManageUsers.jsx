import { useEffect, useState } from 'react';
import { Box, Heading, Table, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useUserStore } from '@/store/user';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const token = useUserStore((state) => state.token);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsers(data.data);
      })
      .catch(err => toast({ title: 'Error fetching users', status: 'error' }));
  }, [token, toast]);

  const deleteUser = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(users.filter(u => u._id !== id));
          toast({ title: 'User deleted', status: 'success' });
        } else {
          toast({ title: data.message, status: 'error' });
        }
      });
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
          toast({ title: 'Role updated', status: 'success' });
        } else {
          toast({ title: data.message, status: 'error' });
        }
      });
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Manage Users</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user._id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <Button size="sm" colorScheme="red" onClick={() => deleteUser(user._id)} mr={2}>
                  Delete
                </Button>
                <Button size="sm" colorScheme="blue" onClick={() => toggleRole(user._id, user.role)}>
                  {user.role === 'admin' ? 'Demote' : 'Promote'}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ManageUsers;
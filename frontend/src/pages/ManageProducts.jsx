import { useEffect, useState } from 'react';
import { Box, Heading, Table, Button, Image, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { useUserStore } from '@/store/user';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const token = useUserStore((state) => state.token);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/products/admin', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      })
      .catch(err => toast({ title: 'Error fetching products', status: 'error' }));
  }, [token, toast]);

  const deleteProduct = (id) => {
    fetch(`/api/products/admin/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(products.filter(p => p._id !== id));
          toast({ title: 'Product deleted', status: 'success' });
        } else {
          toast({ title: data.message, status: 'error' });
        }
      });
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Manage Products</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Image</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>User</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map(product => (
            <Table.Row key={product._id}>
              <Table.Cell>
                <Image src={product.image} alt={product.name} boxSize="50px" objectFit="cover" />
              </Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>{product.user?.name || 'Unknown'}</Table.Cell>
              <Table.Cell>
                <Button size="sm" colorScheme="red" onClick={() => deleteProduct(product._id)} mr={2}>
                  Delete
                </Button>
                {/* Edit button placeholder - can link to edit page or modal */}
                <Button size="sm" colorScheme="blue" disabled>
                  Edit (TBD)
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ManageProducts;
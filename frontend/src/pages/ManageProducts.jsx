import { useEffect, useState } from 'react';
import { Box, Heading, Table, Button, Image, Text, IconButton, HStack, Flex } from '@chakra-ui/react';
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useToast } from '@chakra-ui/toast';
import { useUserStore } from '@/store/user';
import { useColorModeValue } from '@/components/ui/color-mode';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const token = useUserStore((state) => state.token);
  const toast = useToast();
  const hoverBg = useColorModeValue("gray.300", "gray.900");

  useEffect(() => {
    fetch('/api/products/admin', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      })
      .catch(err => toast({ title: 'Error fetching products', status: 'error' }));
  }, [token, toast]);

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const startNumber = products.length === 0 ? 0 : startIndex + 1;
  const endNumber = Math.min(startIndex + itemsPerPage, products.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deleteProduct = (id) => {
    // Logic to handle product deletion
    if (confirm("Do you want to delete this product?")) {
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
    }
  };

  return (
    <Box p={6}>
      <Flex align="center" justify="space-between" mb={6}>
        <Heading>Manage Products</Heading>
        {products.length > 0 && (
          <Text fontSize="14px" fontWeight="bold" color="blue.500">
            Showing {startNumber}–{endNumber} of {products.length}
          </Text>
        )}
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader fontWeight="bold">Image</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Name</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Description</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Price</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">User</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentProducts.map(product => (
            <Table.Row key={product._id} transition="background 0.2s" _hover={{ bg: hoverBg }}>
              <Table.Cell>
                <Image src={product.image} alt={product.name} boxSize="50px" objectFit="cover" />
              </Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>{product.user?.name || 'Unknown'}</Table.Cell>
              <Table.Cell>
                <HStack spacing={2}>                  
                  <IconButton 
                    aria-label="Edit Product" 
                    size="sm" 
                    variant="outline" 
                    colorScheme="blue" 
                    disabled
                  >
                    <LuPencil />
                  </IconButton>
                  <IconButton 
                    aria-label="Delete Product" 
                    size="sm" 
                    variant="outline" 
                    colorScheme="red" 
                    onClick={() => deleteProduct(product._id)} 
                  >
                    <LuTrash2 />
                  </IconButton>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {products.length > itemsPerPage && (
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

export default ManageProducts;
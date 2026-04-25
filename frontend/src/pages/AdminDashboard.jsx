import { Box, Heading, VStack, Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Box p={6}>
      <Heading mb={6}>Admin Dashboard</Heading>
      <VStack spacing={4} align="start">
        <Button as={RouterLink} to="/admin/users" colorScheme="blue">
          Manage Users
        </Button>
        <Button as={RouterLink} to="/admin/products" colorScheme="green">
          Manage Products
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminDashboard;
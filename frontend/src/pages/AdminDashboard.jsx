import { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { LuUsers, LuPackage } from "react-icons/lu";
import { useProductStore } from "@/store/product";
import { useUserStore } from "@/store/user";
import { useColorModeValue } from "@/components/ui/color-mode";

const AdminDashboard = () => {
  const { fetchProducts, products } = useProductStore();
  const [usersCount, setUsersCount] = useState(0);
  const token = useUserStore((state) => state.token);
  const bgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    fetchProducts();
    // Fetch users to get total count
    fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsersCount(data.data.length);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, [fetchProducts, token]);

  const adminCards = [
    {
      label: "Manage Users",
      count: usersCount,
      icon: LuUsers,
      path: "/admin/users",
      color: "blue.500"
    },
    {
      label: "Manage Products",
      count: products.length,
      icon: LuPackage,
      path: "/admin/products",
      color: "green.500"
    }
  ];

  return (
    <Box p={6}>
      <Heading mb={10} textAlign="center" color="blue.500">Admin Dashboard</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={12} rowGap={10} maxW="800px" mx="auto">
        {adminCards.map((card) => (
          <Box
            key={card.label}
            as={RouterLink}
            to={card.path}
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            bg={bgColor}
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px) scale(1.02)", shadow: "xl", borderColor: "teal.300", textDecoration: "none" }}
            textAlign="center"
          >
            <VStack spacing={4}>
              <card.icon size={50} color={card.color} />
              <Box>
                <Text fontSize="4xl" fontWeight="bold">{card.count}</Text>
                <Text fontSize="xl" fontWeight="medium" color="gray.500">{card.label}</Text>
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminDashboard;